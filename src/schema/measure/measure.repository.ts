import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

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
}
