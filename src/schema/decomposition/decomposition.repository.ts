import { Injectable } from '@nestjs/common';
import PQueue from 'p-queue';
import { PrismaService } from 'src/prisma.service';

import { newId } from '../../utils/newId';

import { ElementService } from './element.service';
import { Element } from './models/element.model';

@Injectable()
export class DecompositionRepository {
	public constructor(private elementService: ElementService, private readonly prisma: PrismaService) {}

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
						permanentId: unit.permanentId ?? unit.id,
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
						permanentId: manifestation.permanentId ?? manifestation.id,
					},
				}),
			);
		});
		await queue.onIdle();
	}

	public async cloneDecomposition(surveyId: string, previousSurveyId: string): Promise<Element[]> {
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
						permanentId: element.permanentId ?? element.id,
					},
				});

				// Duplicate units for element
				await this.duplicateUnitsForElement(surveyId, element.id, newElementId);
			});
		});
		await queue.onIdle();

		return this.elementService.getElements(surveyId);
	}

	public async findPreviousSurveyId(surveyId: string): Promise<string | null> {
		const current = await this.prisma.surveys.findUnique({
			where: {
				id: surveyId,
			},
			select: {
				id: true,
				objectId: true,
				inspectionStandardType: true,
			},
		});

		const previous = await this.prisma.surveys.findFirst({
			where: {
				objectId: current.objectId,
				inspectionStandardType: current.inspectionStandardType,
				NOT: {
					id: current.id,
				},
			},
			orderBy: {
				created_at: 'desc',
			},
			select: {
				id: true,
			},
		});

		return previous?.id;
	}

	public async checkIfAlreadyMigrated(surveyId: string): Promise<boolean> {
		const count = await this.prisma.elements.count({
			where: {
				surveyId,
			},
		});

		return !!count;
	}
}
