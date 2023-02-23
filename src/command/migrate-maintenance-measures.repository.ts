import { Injectable } from '@nestjs/common';
import PQueue from 'p-queue';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';
import { newId } from '../utils';
import { MeasureTypes } from '../schema/measure/types/measure';
import { CyclicMeasureTypes } from '../schema/measure/types/cyclic-measure';

import type { MigrateMaintenanceMeasuresReturnType } from './types';

type CyclicMeasureId = string;
type MaintenanceMeasureId = string;

const maintenanceMeasuresRecord = Prisma.validator<Prisma.maintenanceMeasuresArgs>()({});
type MaintenanceMeasure = Prisma.maintenanceMeasuresGetPayload<typeof maintenanceMeasuresRecord>;

@Injectable()
export class MigrateMaintenanceMeasuresRepository {
	/**
	 * We build a registry for cyclicMeasure inserts. This enables us to easily determine what the original
	 * maintenanceMeasure record was that it relates to
	 */
	private cyclicMeasureRegistry: {
		[key: CyclicMeasureId]: MaintenanceMeasureId;
	} = {};

	public constructor(private readonly prisma: PrismaService) {}

	async findObjectsWithMaintenanceMeasures(): Promise<{ id: string; code: string }[]> {
		// Considering the temporary nature of this code I didn't see any value in uncovering how to do this in a
		// somewhat Prisma friendly (less efficient ) manner
		return this.prisma.$queryRaw<{ id: string; code: string }[]>`
			SELECT
				o.id, o.code
			FROM "objects" AS o
			WHERE o.id IN (
				SELECT o2.id
				FROM "objects" AS o2
				INNER JOIN "maintenanceMeasures" mm ON mm."objectId" = o2.id
)		`;
	}

	private async checkIfAlreadyMigrated(surveyId: string): Promise<boolean> {
		const measuresCount = await this.prisma.measures.count({
			where: {
				surveyId,
			},
		});

		const cyclicMeasuresCount = await this.prisma.cyclicMeasures.count({
			where: {
				surveyId,
			},
		});

		return !!measuresCount || !!cyclicMeasuresCount;
	}

	private castMeasureMaintenanceType(maintenanceType: string) {
		switch (maintenanceType) {
			case 'Correctief onderhoud':
				return MeasureTypes.CorrectiveMaintenance;
			case 'Preventief onderhoud':
				return MeasureTypes.PreventiveMaintenance;
			default:
				return maintenanceType;
		}
	}

	private castCyclicMeasureMaintenanceType(maintenanceType: string) {
		switch (maintenanceType) {
			case 'Groot onderhoud':
				return CyclicMeasureTypes.MajorMaintenance;
			case 'Dagelijksonderhoud':
				return CyclicMeasureTypes.DailyMaintenance;
			case 'Vervangen':
				return CyclicMeasureTypes.ToReplace;
			default:
				return maintenanceType;
		}
	}

	private castQuantity(quantity: string): number | null {
		const int = parseInt(quantity, 10);
		return isNaN(int) ? null : int;
	}

	private async migrateToMeasures(surveyId: string) {
		const maintenanceMeasures = await this.prisma.maintenanceMeasures.findMany({
			where: {
				surveyId,
				defaultMaintenanceMeasureId: null,
			},
		});

		const queue = new PQueue({ concurrency: 1 });
		maintenanceMeasures.forEach(
			({
				unitId,
				manifestationId,
				failureModeId,
				defectId,
				description,
				maintenanceType,
				location,
				planYear,
				finalPlanYear,
				quantity,
				quantityUnitOfMeasurement,
				unitPrice,
				costSurcharge,
				created_at: createdAt,
				updated_at: updatedAt,
			}) => {
				queue.add(async () => {
					let unitIdForManifestation = null;
					if (unitId === null) {
						({ unitId: unitIdForManifestation } = await this.prisma.manifestations.findUnique({
							where: {
								id: manifestationId,
							},
						}));
					}

					await this.prisma.measures.create({
						data: {
							id: newId(),
							surveys: {
								connect: {
									id: surveyId,
								},
							},
							units: {
								connect: {
									id: unitId || unitIdForManifestation,
								},
							},
							description,
							maintenanceType: this.castMeasureMaintenanceType(maintenanceType),
							location,
							planYear,
							finalPlanYear,
							quantity: this.castQuantity(quantity),
							quantityUnitOfMeasurement,
							unitPrice,
							costSurcharge,
							created_at: createdAt,
							updated_at: updatedAt,
							...(manifestationId
								? {
										manifestations: {
											connect: {
												id: manifestationId,
											},
										},
								  }
								: {}),
							...(defectId
								? {
										defects: {
											connect: {
												id: defectId,
											},
										},
								  }
								: {}),
							...(failureModeId
								? {
										failureModes: {
											connect: {
												id: failureModeId,
											},
										},
								  }
								: {}),
						},
					});
				});
			},
		);
		await queue.onIdle();
	}

	/**
	 * Finds the id of the unit that was scoped to this specific surveyId using the unitId from a previous survey
	 */
	private async getUnitIdMatchingSurveyId(surveyId: string, unitId: string): Promise<string | null> {
		if (!unitId) {
			return null;
		}

		const { permanentId } = await this.prisma.units.findUnique({
			where: {
				id: unitId,
			},
			select: {
				permanentId: true,
			},
		});

		const { id } = await this.prisma.units.findFirst({
			where: {
				permanentId,
				surveyId,
			},
			select: {
				id: true,
			},
		});

		return id;
	}

	/**
	 * Finds the id of the manifestation that was scoped to this specific surveyId using the manifestationId from a
	 * previous survey
	 */
	private async getManifestationIdMatchingSurveyId(
		surveyId: string,
		manifestationId: string,
	): Promise<string | null> {
		if (!manifestationId) {
			return null;
		}

		const { permanentId } = await this.prisma.manifestations.findUnique({
			where: {
				id: manifestationId,
			},
			select: {
				permanentId: true,
			},
		});

		const { id } = await this.prisma.manifestations.findFirst({
			where: {
				permanentId,
				surveyId,
			},
			select: {
				id: true,
			},
		});

		return id;
	}

	private async copyMeasuresFromPreviousSurvey(surveyId: string, previousSurveyId: string) {
		const measures = await this.prisma.measures.findMany({
			where: {
				surveyId: previousSurveyId,
			},
		});

		const queue = new PQueue({ concurrency: 1 });

		measures.forEach((measure) => {
			queue.add(async () => {
				const unitId = await this.getUnitIdMatchingSurveyId(surveyId, measure.unitId);
				const manifestationId = await this.getManifestationIdMatchingSurveyId(
					surveyId,
					measure.manifestationId,
				);

				await this.prisma.measures.create({
					data: {
						...measure,
						id: newId(),
						unitId,
						manifestationId,
					},
				});
			});
		});

		await queue.onIdle();
	}

	private async getCyclicMeasureId(
		surveyId: string,
		unitId: string,
		defaultMaintenanceMeasureId: string,
	): Promise<string | undefined> {
		const cyclicMeasure = await this.prisma.cyclicMeasures.findFirst({
			select: {
				id: true,
			},
			where: {
				surveyId,
				unitId,
				defaultMaintenanceMeasureId,
			},
		});
		return cyclicMeasure?.id;
	}

	private async createCyclicMeasureFromMaintenanceMeasure(surveyId: string, maintenanceMeasure: MaintenanceMeasure) {
		const {
			id,
			unitId,
			planYear,
			finalPlanYear,
			costSurcharge,
			maintenanceType,
			remarks,
			cycle,
			unitPrice,
			quantityUnitOfMeasurement,
			defaultMaintenanceMeasureId,
			created_at: createdAt,
			updated_at: updatedAt,
			failureModeId,
		} = maintenanceMeasure;

		const newCyclicMeasureId = newId();

		const unitIdMatchingSurveyId = await this.getUnitIdMatchingSurveyId(surveyId, unitId);

		// Before we insert the cyclic measure, we need to check if perhaps a cyclic measure was already created using
		// the same surveyId/unitId/defaultMaintenanceMeasureId combo (unique constraint)
		// The newer generated maintenanceMeasure will be considered the relevant one, so we remove the existing record
		// and insert a new one
		const cyclicMeasureMatchingConstraint = await this.getCyclicMeasureId(
			surveyId,
			unitIdMatchingSurveyId,
			defaultMaintenanceMeasureId,
		);

		if (cyclicMeasureMatchingConstraint) {
			await this.prisma.cyclicMeasures.delete({
				where: {
					id: cyclicMeasureMatchingConstraint,
				},
			});
		}

		await this.prisma.cyclicMeasures.create({
			data: {
				id: newCyclicMeasureId,
				surveys: {
					connect: {
						id: surveyId,
					},
				},
				units: {
					connect: {
						id: unitIdMatchingSurveyId,
					},
				},
				defaultMaintenanceMeasures: {
					connect: {
						id: defaultMaintenanceMeasureId,
					},
				},
				...(failureModeId
					? {
							failureModes: {
								connect: {
									id: failureModeId,
								},
							},
					  }
					: {}),
				planYear,
				finalPlanYear,
				costSurcharge,
				maintenanceType: this.castCyclicMeasureMaintenanceType(maintenanceType),
				remarks,
				cycle,
				unitPrice,
				quantityUnitOfMeasurement,
				created_at: createdAt,
				updated_at: updatedAt,
			},
		});

		// Ensure we can determine what maintenanceMeasure record each cyclicMeasure was created from
		this.cyclicMeasureRegistry[newCyclicMeasureId] = id;
	}

	private async migrateToCyclicMeasures(surveyId: string) {
		const maintenanceMeasures = await this.prisma.maintenanceMeasures.findMany({
			where: {
				surveyId,
				previousMaintenanceMeasureId: null,
				NOT: {
					defaultMaintenanceMeasureId: null,
				},
			},
		});

		const queue = new PQueue({ concurrency: 1 });
		maintenanceMeasures.forEach((maintenanceMeasure) => {
			queue.add(async () => this.createCyclicMeasureFromMaintenanceMeasure(surveyId, maintenanceMeasure));
		});
		await queue.onIdle();
	}

	private async getMutatedMaintenanceMeasureRecord(surveyId: string, cyclicMeasureId: CyclicMeasureId) {
		const maintenanceMeasureId = this.cyclicMeasureRegistry[cyclicMeasureId];

		if (!maintenanceMeasureId) {
			return null;
		}

		// Retrieve maintenanceMeasure record this cyclicMeasure was created from
		const { unitId, defaultMaintenanceMeasureId } = await this.prisma.maintenanceMeasures.findUnique({
			where: {
				id: maintenanceMeasureId,
			},
			select: {
				unitId: true,
				defaultMaintenanceMeasureId: true,
			},
		});

		return this.prisma.maintenanceMeasures.findFirst({
			where: {
				unitId,
				defaultMaintenanceMeasureId,
				surveyId,
			},
		});
	}

	private async copyCyclicMeasuresFromPreviousSurvey(surveyId: string, previousSurveyId: string) {
		const cyclicMeasures = await this.prisma.cyclicMeasures.findMany({
			where: {
				surveyId: previousSurveyId,
			},
		});

		const queue = new PQueue({ concurrency: 1 });

		cyclicMeasures.forEach((cyclicMeasure) => {
			queue.add(async () => {
				// Check if a mutated copy of the generated maintenanceMeasure was created
				// (unitId+defaultMaintenanceMeasureId form a unique constraint)
				const { id } = cyclicMeasure;
				const mutatedMaintenanceMeasure = await this.getMutatedMaintenanceMeasureRecord(surveyId, id);

				if (mutatedMaintenanceMeasure) {
					// Clone cyclicMeasure from the mutated maintenanceMeasures record
					await this.createCyclicMeasureFromMaintenanceMeasure(surveyId, mutatedMaintenanceMeasure);
				} else {
					// Simply clone the cyclicMeasures record from the previous survey to the current survey
					const {
						planYear,
						finalPlanYear,
						costSurcharge,
						maintenanceType,
						remarks,
						cycle,
						unitPrice,
						quantityUnitOfMeasurement,
						defaultMaintenanceMeasureId,
					} = cyclicMeasure;

					await this.prisma.cyclicMeasures.create({
						data: {
							id: newId(),
							surveys: {
								connect: {
									id: surveyId,
								},
							},
							units: {
								connect: {
									id: await this.getUnitIdMatchingSurveyId(surveyId, cyclicMeasure.unitId),
								},
							},
							planYear,
							finalPlanYear,
							costSurcharge,
							maintenanceType,
							remarks,
							cycle,
							unitPrice,
							quantityUnitOfMeasurement,
							defaultMaintenanceMeasures: {
								connect: {
									id: defaultMaintenanceMeasureId,
								},
							},
						},
					});
				}
			});
		});

		await queue.onIdle();
	}

	async migrateMaintenanceMeasures(objectId: string): Promise<MigrateMaintenanceMeasuresReturnType> {
		const errors = [];
		const log = [];
		const successSurveyIds = [];
		const failedSurveyIds = [];

		// Determine object code for log readability
		const { code: objectCode } = await this.prisma.objects.findUnique({
			where: {
				id: objectId,
			},
			select: {
				code: true,
			},
		});

		// Fetch chronologically ordered (the oldest first) TI/IHA surveys for object
		const surveys = await this.prisma.surveys.findMany({
			where: {
				objectId,
				inspectionStandardType: {
					in: ['nen2767', 'fmeca'],
				},
			},
			orderBy: {
				created_at: 'asc',
			},
			select: {
				id: true,
			},
		});

		const queue = new PQueue({ concurrency: 1 });

		let previousSurveyId: string;

		surveys.forEach(({ id: surveyId }) => {
			queue.add(async () => {
				try {
					const alreadyMigrated = await this.checkIfAlreadyMigrated(surveyId);
					if (alreadyMigrated) {
						log.push(
							`[MIGRATED ALREADY] Skipping maintenance measures for "${objectCode}" for survey with id "${surveyId}"`,
						);
						return;
					}

					// Measures (corrective/preventative)
					// If there is an older survey, start by cloning the corrective/preventative measures from that
					// survey (only looking at migrated data: measures table => measures table)
					if (previousSurveyId) {
						await this.copyMeasuresFromPreviousSurvey(surveyId, previousSurveyId);
					}
					// Migrate corrective/preventative maintenanceMeasures that were created in the current survey to
					// measures (maintenanceMeasures table => measures table)
					await this.migrateToMeasures(surveyId);
					log.push(
						`Migrated corrective/preventative measures for "${objectCode}" and survey id "${surveyId}"`,
					);

					// Cyclic Measures
					// Clone each cyclicMeasure from the previous survey unless there is a mutated maintenanceMeasures
					// record (previousMaintenanceMeasureId != null), in that case, clone from the maintenanceMeasures
					// record instead.
					if (previousSurveyId) {
						await this.copyCyclicMeasuresFromPreviousSurvey(surveyId, previousSurveyId);
					}

					// Copy maintenanceMeasures records to cyclicMeasures
					// WHERE
					// 	previousMaintenanceMeasureId is NULL
					// 	AND defaultMaintenanceMeasureId IS NOT NULL
					await this.migrateToCyclicMeasures(surveyId);

					log.push(`Cloned measures/cyclicMeasures for "${objectCode}" to survey with id "${surveyId}"`);

					successSurveyIds.push(surveyId);
				} catch (err) {
					failedSurveyIds.push(surveyId);
					errors.push(
						`Failed to migrate maintenance measures for "${objectCode}" to survey with id ${surveyId}: ${err.message}`,
					);
				}
				previousSurveyId = surveyId;
			});
		});

		await queue.onIdle();

		return {
			errors,
			log,
			successSurveyIds,
			failedSurveyIds,
		};
	}
}
