import { Injectable } from '@nestjs/common';
import PQueue from 'p-queue';

import { PrismaService } from '../prisma.service';
import { newId } from '../utils';

import type { Nen2767MigrateDecompositionReturnType } from './types';

@Injectable()
export class Nen2767MigrateDecompositionRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async findObjectsWithNen2767Decomposition(): Promise<{ id: string; code: string }[]> {
		// Considering the temporary nature of this code I didn't see any value in uncovering how to do this in a
		// somewhat Prisma friendly (less efficient ) manner
		return this.prisma.$queryRaw<{ id: string; code: string }[]>`
			SELECT o.id, o.code
			FROM "objects" AS o
			WHERE o.id IN (
				SELECT o2.id
				FROM "objects" AS o2
				INNER JOIN "surveys" s on s."objectId" = o.id
				WHERE s."inspectionStandardType" in ('nen2767', 'fmeca')
			)
		`;
	}

	private async setPermanentIdOnElements(surveyId: string) {
		const elements = await this.prisma.elements.findMany({
			where: {
				surveyId,
				permanentId: null,
			},
			select: {
				id: true,
			},
		});

		await Promise.all(
			elements.map(({ id: elementId }) =>
				this.prisma.elements.update({
					where: {
						id: elementId,
					},
					data: {
						permanentId: elementId,
					},
				}),
			),
		);
	}

	private async setPermanentIdOnUnits(surveyId: string) {
		const units = await this.prisma.units.findMany({
			where: {
				surveyId,
				permanentId: null,
			},
			select: {
				id: true,
			},
		});

		await Promise.all(
			units.map(({ id: unitId }) =>
				this.prisma.units.update({
					where: {
						id: unitId,
					},
					data: {
						permanentId: unitId,
					},
				}),
			),
		);
	}

	private async setPermanentIdOnManifestations(surveyId: string) {
		const manifestations = await this.prisma.manifestations.findMany({
			where: {
				surveyId,
				permanentId: null,
			},
			select: {
				id: true,
			},
		});

		await Promise.all(
			manifestations.map(({ id: manifestationId }) =>
				this.prisma.manifestations.update({
					where: {
						id: manifestationId,
					},
					data: {
						permanentId: manifestationId,
					},
				}),
			),
		);
	}

	private async scopeDecompositionToSurveyId(objectId: string, surveyId: string) {
		await this.prisma.elements.updateMany({
			where: {
				objectId,
				// Ensure we don't include any newer elements that have been inserted via the GraphQL service
				surveyId: null,
			},
			data: {
				surveyId,
			},
		});

		await this.prisma.units.updateMany({
			where: {
				objectId,
				// Ensure we don't include any newer units that have been inserted via the GraphQL service
				surveyId: null,
			},
			data: {
				surveyId,
			},
		});

		await this.prisma.manifestations.updateMany({
			where: {
				objectId,
				// Ensure we don't include any newer manifestations that have been inserted via the GraphQL service
				surveyId: null,
			},
			data: {
				surveyId,
			},
		});
	}

	private async duplicateUnitsForElement(surveyId: string, elementId: string, newElementId: string) {
		const units = await this.prisma.units.findMany({
			where: {
				elementId,
			},
		});

		const queue = new PQueue({ concurrency: 1 });
		units.forEach((unit) => {
			queue.add(async () => {
				const newUnitId = newId();
				// Duplicate unit record but with new id and different surveyId
				await this.prisma.units.create({
					data: {
						...unit,
						id: newUnitId,
						elementId: newElementId,
						surveyId,
					},
				});

				// Duplicate manifestations for unit
				await this.duplicateManifestationsForUnit(surveyId, newElementId, unit.id, newUnitId);
			});
		});
		await queue.onIdle();
	}

	private async duplicateManifestationsForUnit(
		surveyId: string,
		newElementId: string,
		unitId: string,
		newUnitId: string,
	) {
		const manifestations = await this.prisma.manifestations.findMany({
			where: {
				unitId,
			},
		});

		const queue = new PQueue({ concurrency: 1 });
		manifestations.forEach((manifestation) => {
			queue.add(() =>
				this.prisma.manifestations.create({
					data: {
						...manifestation,
						id: newId(),
						elementId: newElementId,
						unitId: newUnitId,
						surveyId,
					},
				}),
			);
		});
		await queue.onIdle();
	}

	private async cloneDecompositionFromPreviousSurvey(surveyId: string, previousSurveyId: string) {
		const elements = await this.prisma.elements.findMany({
			where: {
				surveyId: previousSurveyId,
			},
		});

		const queue = new PQueue({ concurrency: 1 });
		elements.forEach((element) => {
			queue.add(async () => {
				const newElementId = newId();
				// Duplicate element record but with new id and different surveyId
				await this.prisma.elements.create({
					data: {
						...element,
						id: newElementId,
						surveyId,
					},
				});

				// Duplicate units for element
				await this.duplicateUnitsForElement(surveyId, element.id, newElementId);
			});
		});
		await queue.onIdle();
	}

	private async checkIfAlreadyMigrated(surveyId: string): Promise<boolean> {
		const count = await this.prisma.elements.count({
			where: {
				surveyId,
			},
		});
		return !!count;
	}

	private async getElementIdForPermanentId(elementId: string, surveyId: string): Promise<string | null> {
		const element = await this.prisma.elements.findFirst({
			where: {
				permanentId: elementId,
				surveyId,
			},
		});
		return element?.id ?? null;
	}

	private async getUnitIdForPermanentId(unitId: string, surveyId: string): Promise<string | null> {
		const unit = await this.prisma.units.findFirst({
			where: {
				permanentId: unitId,
				surveyId,
			},
		});
		return unit?.id ?? null;
	}

	private async getManifestationIdForPermanentId(manifestationId: string, surveyId: string): Promise<string | null> {
		const manifestation = await this.prisma.manifestations.findFirst({
			where: {
				permanentId: manifestationId,
				surveyId,
			},
		});
		return manifestation?.id ?? null;
	}

	private async reAttachEntitiesOfType(
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore There appears no way to meaningfully type a generic with one or other prisma model
		prismaEntity: any,
		surveyId: string,
		options: {
			elements?: boolean | [boolean, string];
			units?: boolean | [boolean, string];
			manifestations?: boolean | [boolean, string];
		},
	) {
		const entities = await prismaEntity.findMany({
			where: {
				surveyId,
			},
		});

		const elements = Array.isArray(options?.elements) ? options?.elements[0] : options?.elements;
		const units = Array.isArray(options?.units) ? options?.units[0] : options?.units;
		const manifestations = Array.isArray(options?.manifestations)
			? options?.manifestations[0]
			: options?.manifestations;

		await Promise.all(
			entities.map(async (entity) => {
				if (elements === true) {
					const newElementId = await this.getElementIdForPermanentId(entity.elementId, surveyId);
					if (entity.elementId && !newElementId) {
						throw new Error(
							`Failed to find element matching surveyId "${surveyId}" and elementId "${entity.elementId}"`,
						);
					}

					if (newElementId) {
						await prismaEntity.update({
							data: {
								// Foreign key relations are not consistently named in the prisma schema
								[options?.elements?.[1] ?? 'elements']: {
									connect: {
										id: newElementId,
									},
								},
							},
							where: {
								id: entity.id,
							},
						});
					}
				}

				if (units === true) {
					const newUnitId = await this.getUnitIdForPermanentId(entity.unitId, surveyId);

					if (entity.unitId && !newUnitId) {
						throw new Error(
							`Failed to find unit matching surveyId "${surveyId}" and unitId "${entity.unitId}"`,
						);
					}

					if (newUnitId) {
						await prismaEntity.update({
							data: {
								// Foreign key relations are not consistently named in the prisma schema
								[options?.units?.[1] ?? 'units']: {
									connect: {
										id: newUnitId,
									},
								},
							},
							where: {
								id: entity.id,
							},
						});
					}
				}

				if (manifestations === true) {
					const newManifestationId = await this.getManifestationIdForPermanentId(
						entity.manifestationId,
						surveyId,
					);

					if (entity.manifestationId && !newManifestationId) {
						throw new Error(
							`Failed to find manifestation matching surveyId "${surveyId}" and manifestationId "${entity.manifestationId}"`,
						);
					}

					if (newManifestationId) {
						await prismaEntity.update({
							data: {
								// Foreign key relations are not consistently named in the prisma schema
								[options?.manifestations?.[1] ?? 'manifestations']: {
									connect: {
										id: newManifestationId,
									},
								},
							},
							where: {
								id: entity.id,
							},
						});
					}
				}
			}),
		);
	}

	private async reAttachRelatedEntities(surveyId: string) {
		await this.reAttachEntitiesOfType(this.prisma.assets, surveyId, {
			elements: true,
			units: true,
			manifestations: true,
		});
		await this.reAttachEntitiesOfType(this.prisma.utProjects, surveyId, {
			elements: true,
			units: true,
			manifestations: true,
		});
		await this.reAttachEntitiesOfType(this.prisma.failureModes, surveyId, {
			elements: true,
			units: true,
			manifestations: true,
		});
		await this.reAttachEntitiesOfType(this.prisma.observationPoints, surveyId, {
			elements: [true, 'elements_elementsToobservationPoints_elementId'],
			units: [true, 'units_observationPoints_unitIdTounits'],
			manifestations: [true, 'manifestations_manifestationsToobservationPoints_manifestationId'],
		});
		await this.reAttachEntitiesOfType(this.prisma.elementRemarks, surveyId, {
			elements: true,
		});
		await this.reAttachEntitiesOfType(this.prisma.surveyElements, surveyId, {
			elements: true,
		});
		await this.reAttachEntitiesOfType(this.prisma.conditions, surveyId, {
			elements: [true, 'elements_conditions_elementIdToelements'],
			units: [true, 'units_conditions_unitIdTounits'],
			manifestations: [true, 'manifestations_conditions_manifestationIdTomanifestations'],
		});
		await this.reAttachEntitiesOfType(this.prisma.derivedConditionScores, surveyId, {
			elements: true,
			units: true,
			manifestations: true,
		});
		await this.reAttachEntitiesOfType(this.prisma.unitRemarks, surveyId, {
			units: true,
		});
		await this.reAttachEntitiesOfType(this.prisma.fmecaFurtherInvestigations, surveyId, {
			units: true,
			manifestations: true,
		});
		await this.reAttachEntitiesOfType(this.prisma.surveyUnits, surveyId, {
			units: true,
		});
		await this.reAttachEntitiesOfType(this.prisma.inspectionPlans, surveyId, {
			units: true,
			manifestations: true,
		});
		await this.reAttachEntitiesOfType(this.prisma.inspectionFindings, surveyId, {
			units: true,
		});
		await this.reAttachEntitiesOfType(this.prisma.surveyManifestations, surveyId, {
			manifestations: true,
		});
		await this.reAttachEntitiesOfType(this.prisma.manifestationRemarks, surveyId, {
			manifestations: true,
		});
	}

	async migrateNen2767Decomposition(objectId: string): Promise<Nen2767MigrateDecompositionReturnType> {
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
		const surveysWithNen2767Decomposition = await this.prisma.surveys.findMany({
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

		surveysWithNen2767Decomposition.forEach(({ id: surveyId }, idx) => {
			queue.add(async () => {
				try {
					const alreadyMigrated = await this.checkIfAlreadyMigrated(surveyId);
					if (alreadyMigrated) {
						log.push(
							`[MIGRATED ALREADY] Skipping decomposition for "${objectCode}" for survey with id "${surveyId}"`,
						);
						return;
					}

					if (idx === 0) {
						// The oldest survey is assigned the original set of elements/units/manifestations records
						await this.scopeDecompositionToSurveyId(objectId, surveyId);
						await this.setPermanentIdOnElements(surveyId);
						await this.setPermanentIdOnUnits(surveyId);
						await this.setPermanentIdOnManifestations(surveyId);
						log.push(`Scoped decomposition for "${objectCode}" to survey with id "${surveyId}"`);
					} else {
						// Newer surveys get a clone of the decomposition
						await this.cloneDecompositionFromPreviousSurvey(surveyId, previousSurveyId);
						log.push(`Cloned decomposition for "${objectCode}" to survey with id "${surveyId}"`);

						// Re-attach related entities to new element/unit/manifestation id's
						await this.reAttachRelatedEntities(surveyId);
					}

					successSurveyIds.push(surveyId);
				} catch (err) {
					failedSurveyIds.push(surveyId);
					errors.push(
						`Failed to migrate decomposition for "${objectCode}" to survey with id ${surveyId}: ${err.message}`,
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
