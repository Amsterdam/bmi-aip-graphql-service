import { Injectable } from '@nestjs/common';
import PQueue from 'p-queue';

import { PrismaService } from '../prisma.service';
// import { newId } from '../utils';

import type { MigrateMaintenanceMeasuresReturnType } from './types';

@Injectable()
export class MigrateMaintenanceMeasuresRepository {
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

	// private async setPermanentIdOnElements(surveyId: string) {
	// 	const elements = await this.prisma.elements.findMany({
	// 		where: {
	// 			surveyId,
	// 			permanentId: null,
	// 		},
	// 		select: {
	// 			id: true,
	// 		},
	// 	});
	//
	// 	await Promise.all(
	// 		elements.map(({ id: elementId }) =>
	// 			this.prisma.elements.update({
	// 				where: {
	// 					id: elementId,
	// 				},
	// 				data: {
	// 					permanentId: elementId,
	// 				},
	// 			}),
	// 		),
	// 	);
	// }
	//
	// private async setPermanentIdOnUnits(surveyId: string) {
	// 	const units = await this.prisma.units.findMany({
	// 		where: {
	// 			surveyId,
	// 			permanentId: null,
	// 		},
	// 		select: {
	// 			id: true,
	// 		},
	// 	});
	//
	// 	await Promise.all(
	// 		units.map(({ id: unitId }) =>
	// 			this.prisma.units.update({
	// 				where: {
	// 					id: unitId,
	// 				},
	// 				data: {
	// 					permanentId: unitId,
	// 				},
	// 			}),
	// 		),
	// 	);
	// }
	//
	// private async setPermanentIdOnManifestations(surveyId: string) {
	// 	const manifestations = await this.prisma.manifestations.findMany({
	// 		where: {
	// 			surveyId,
	// 			permanentId: null,
	// 		},
	// 		select: {
	// 			id: true,
	// 		},
	// 	});
	//
	// 	await Promise.all(
	// 		manifestations.map(({ id: manifestationId }) =>
	// 			this.prisma.manifestations.update({
	// 				where: {
	// 					id: manifestationId,
	// 				},
	// 				data: {
	// 					permanentId: manifestationId,
	// 				},
	// 			}),
	// 		),
	// 	);
	// }
	//
	// private async scopeDecompositionToSurveyId(objectId: string, surveyId: string) {
	// 	await this.prisma.elements.updateMany({
	// 		where: {
	// 			objectId,
	// 			// Ensure we don't include any newer elements that have been inserted via the GraphQL service
	// 			surveyId: null,
	// 		},
	// 		data: {
	// 			surveyId,
	// 		},
	// 	});
	//
	// 	await this.prisma.units.updateMany({
	// 		where: {
	// 			objectId,
	// 			// Ensure we don't include any newer units that have been inserted via the GraphQL service
	// 			surveyId: null,
	// 		},
	// 		data: {
	// 			surveyId,
	// 		},
	// 	});
	//
	// 	await this.prisma.manifestations.updateMany({
	// 		where: {
	// 			objectId,
	// 			// Ensure we don't include any newer manifestations that have been inserted via the GraphQL service
	// 			surveyId: null,
	// 		},
	// 		data: {
	// 			surveyId,
	// 		},
	// 	});
	// }
	//
	// private async duplicateUnitsForElement(surveyId: string, elementId: string, newElementId: string) {
	// 	const units = await this.prisma.units.findMany({
	// 		where: {
	// 			elementId,
	// 		},
	// 	});
	//
	// 	const queue = new PQueue({ concurrency: 1 });
	// 	units.forEach((unit) => {
	// 		queue.add(async () => {
	// 			const newUnitId = newId();
	// 			// Duplicate unit record but with new id and different surveyId
	// 			await this.prisma.units.create({
	// 				data: {
	// 					...unit,
	// 					id: newUnitId,
	// 					elementId: newElementId,
	// 					surveyId,
	// 				},
	// 			});
	//
	// 			// Duplicate manifestations for unit
	// 			await this.duplicateManifestationsForUnit(surveyId, newElementId, unit.id, newUnitId);
	// 		});
	// 	});
	// 	await queue.onIdle();
	// }
	//
	// private async duplicateManifestationsForUnit(
	// 	surveyId: string,
	// 	newElementId: string,
	// 	unitId: string,
	// 	newUnitId: string,
	// ) {
	// 	const manifestations = await this.prisma.manifestations.findMany({
	// 		where: {
	// 			unitId,
	// 		},
	// 	});
	//
	// 	const queue = new PQueue({ concurrency: 1 });
	// 	manifestations.forEach((manifestation) => {
	// 		queue.add(() =>
	// 			this.prisma.manifestations.create({
	// 				data: {
	// 					...manifestation,
	// 					id: newId(),
	// 					elementId: newElementId,
	// 					unitId: newUnitId,
	// 					surveyId,
	// 				},
	// 			}),
	// 		);
	// 	});
	// 	await queue.onIdle();
	// }
	//
	// private async cloneDecompositionFromPreviousSurvey(surveyId: string, previousSurveyId: string) {
	// 	const elements = await this.prisma.elements.findMany({
	// 		where: {
	// 			surveyId: previousSurveyId,
	// 		},
	// 	});
	//
	// 	const queue = new PQueue({ concurrency: 1 });
	// 	elements.forEach((element) => {
	// 		queue.add(async () => {
	// 			const newElementId = newId();
	// 			// Duplicate element record but with new id and different surveyId
	// 			await this.prisma.elements.create({
	// 				data: {
	// 					...element,
	// 					id: newElementId,
	// 					surveyId,
	// 				},
	// 			});
	//
	// 			// Duplicate units for element
	// 			await this.duplicateUnitsForElement(surveyId, element.id, newElementId);
	// 		});
	// 	});
	// 	await queue.onIdle();
	// }

	private async checkIfAlreadyMigrated(surveyId: string): Promise<boolean> {
		const count = await this.prisma.elements.count({
			where: {
				surveyId,
			},
		});
		return !!count;
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

		// Fetch chronologically ordered (oldest first) TI/IHA surveys for object
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

		surveys.forEach(({ id: surveyId }, idx) => {
			queue.add(async () => {
				try {
					const alreadyMigrated = await this.checkIfAlreadyMigrated(surveyId);
					if (alreadyMigrated) {
						log.push(
							`[MIGRATED ALREADY] Skipping maintenance measures for "${objectCode}" for survey with id "${surveyId}"`,
						);
						return;
					}

					if (idx === 0) {
						// The oldest survey is assigned the original set of elements/units/manifestations records
						// await this.scopeDecompositionToSurveyId(objectId, surveyId);
						// await this.setPermanentIdOnElements(surveyId);
						// await this.setPermanentIdOnUnits(surveyId);
						// await this.setPermanentIdOnManifestations(surveyId);
						log.push(`Copied maintenanceMeasures for "${objectCode}" to survey with id "${surveyId}"`);
					} else {
						// Newer surveys get a clone of the decomposition
						// await this.cloneDecompositionFromPreviousSurvey(surveyId, previousSurveyId);
						log.push(`Cloned measures/cyclicMeasures for "${objectCode}" to survey with id "${surveyId}"`);
					}
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
