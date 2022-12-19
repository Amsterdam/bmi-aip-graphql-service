import { Injectable } from '@nestjs/common';
import PQueue from 'p-queue';

import { PrismaService } from '../prisma.service';
import { newId } from '../utils';

import type { MigrateNen2767DecompositionReturnType } from './types';

@Injectable()
export class MigrateNen2767DecompositionRepository {
	public constructor(private readonly prisma: PrismaService) {}

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

		await Promise.all(
			units.map(async (unit) => {
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
			}),
		);
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

		await Promise.all(
			manifestations.map(async (manifestation) => {
				await this.prisma.manifestations.create({
					data: {
						...manifestation,
						id: newId(),
						elementId: newElementId,
						unitId: newUnitId,
						surveyId,
					},
				});
			}),
		);
	}

	private async cloneDecompositionFromPreviousSurvey(surveyId: string, previousSurveyId: string) {
		const elements = await this.prisma.elements.findMany({
			where: {
				surveyId: previousSurveyId,
			},
		});

		await Promise.all(
			elements.map(async (element) => {
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
			}),
		);
	}

	async migrateNen2767Decomposition(objectId: string): Promise<MigrateNen2767DecompositionReturnType> {
		const errors = [];
		const log = [];

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
		});

		const queue = new PQueue({ concurrency: 1 });

		let previousSurveyId: string;

		surveysWithNen2767Decomposition.forEach(({ id: surveyId }, idx) => {
			queue.add(async () => {
				if (idx === 0) {
					await this.scopeDecompositionToSurveyId(objectId, surveyId);
					await this.setPermanentIdOnElements(surveyId);
					await this.setPermanentIdOnUnits(surveyId);
					await this.setPermanentIdOnManifestations(surveyId);
				} else {
					await this.cloneDecompositionFromPreviousSurvey(surveyId, previousSurveyId);
				}
				previousSurveyId = surveyId;
			});
		});

		return {
			errors,
			log,
			successSurveyIds: [],
			failedSurveyIds: [],
		};
	}

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
}
