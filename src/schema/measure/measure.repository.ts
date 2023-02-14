import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import PQueue from 'p-queue';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';
import { Manifestation } from '../decomposition/types/manifestation.repository.interface';
import { Unit } from '../decomposition/types/unit.repository.interface';
import { DecompositionCloneNotFoundException } from '../decomposition/exceptions/decomposition-clone-not-found.exception';

import { Measure, IMeasureRepository } from './types/measure.repository.interface';
import { CreateMeasureInput } from './dto/create-measure.input';
import { UpdateMeasureInput } from './dto/update-measure.input';

@Injectable()
export class MeasureRepository implements IMeasureRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async createMeasure({
		maintenanceType,
		surveyId,
		unitId,
		failureModeId,
		manifestationId,
		defectId,
		planYear,
		finalPlanYear,
		costSurcharge,
		unitPrice,
		quantityUnitOfMeasurement,
		description,
		location,
		quantity,
		surveyScopeId,
	}: CreateMeasureInput): Promise<Measure> {
		const data: Prisma.measuresCreateInput = {
			id: newId(),
			maintenanceType: maintenanceType,
			surveys: { connect: { id: surveyId } },
			units: { connect: { id: unitId } },
			failureModes: {
				connect: {
					id: failureModeId,
				},
			},
			manifestations: {
				connect: {
					id: manifestationId,
				},
			},
			defects: {
				connect: {
					id: defectId,
				},
			},
			planYear,
			finalPlanYear,
			costSurcharge,
			unitPrice,
			quantityUnitOfMeasurement: quantityUnitOfMeasurement,
			description,
			location,
			quantity,
			surveyScopeId,
		};

		return this.prisma.measures.create({ data });
	}

	async findMeasures(surveyId: string): Promise<Measure[]> {
		return this.prisma.measures.findMany({
			where: {
				surveyId,
			},
		});
	}

	async updateMeasure({
		id,
		planYear,
		finalPlanYear,
		costSurcharge,
		unitPrice,
		quantityUnitOfMeasurement,
		maintenanceType,
		description,
		location,
		quantity,
		surveyScopeId,
	}: UpdateMeasureInput): Promise<Measure> {
		const data: Prisma.measuresUpdateInput = {
			planYear,
			finalPlanYear,
			costSurcharge,
			unitPrice,
			quantityUnitOfMeasurement,
			maintenanceType,
			description,
			location,
			quantity,
			surveyScopeId,
		};

		return this.prisma.measures.update({
			where: { id },
			data,
		});
	}

	async deleteMeasure(identifier: string): Promise<Measure> {
		const data: Prisma.measuresUpdateInput = {
			deleted_at: new Date(),
		};

		return this.prisma.measures.update({
			where: { id: identifier },
			data,
		});
	}

	async findLastClonedUnit(unitId: string, surveyId: string): Promise<Unit> {
		const unit = await this.prisma.units.findUnique({
			where: {
				id: unitId,
			},
		});

		const lastCreated = await this.prisma.units.findFirst({
			where: {
				permanentId: unit.permanentId ?? unit.id,
				surveyId: surveyId,
			},
			orderBy: {
				created_at: 'desc',
			},
		});

		if (lastCreated == null) {
			throw new DecompositionCloneNotFoundException(surveyId);
		}

		return lastCreated;
	}

	async findLastClonedManifestation(manifestationId: string, surveyId: string): Promise<Manifestation> {
		const manifestation = await this.prisma.manifestations.findUnique({
			where: {
				id: manifestationId,
			},
		});

		const lastCreated = await this.prisma.manifestations.findFirst({
			where: {
				permanentId: manifestation.permanentId ?? manifestation.id,
				surveyId: surveyId,
			},
			orderBy: {
				created_at: 'desc',
			},
		});

		if (lastCreated == null) {
			throw new DecompositionCloneNotFoundException(surveyId);
		}

		return lastCreated;
	}

	public async cloneMeasures(surveyId: string, previousSurveyId: string): Promise<Measure[]> {
		const measures = await this.findMeasures(previousSurveyId);
		const queue = new PQueue({ concurrency: 1 });

		measures.forEach((measure) => {
			queue.add(async () => {
				const newMeasureId = newId();

				// Find linked units and manifestations ids
				if (measure.unitId) {
					const unit = await this.findLastClonedUnit(measure.unitId, surveyId);
					measure.unitId = unit.id;
				} else if (measure.manifestationId) {
					const manifestation = await this.findLastClonedManifestation(measure.manifestationId, surveyId);
					measure.manifestationId = manifestation.id;
				}

				// Duplicate measure record but with new id and different surveyId
				await this.prisma.measures.create({
					data: {
						...measure,
						id: newMeasureId,
						surveyId,
					},
				});
			});
		});
		await queue.onIdle();

		return this.findMeasures(surveyId);
	}
}
