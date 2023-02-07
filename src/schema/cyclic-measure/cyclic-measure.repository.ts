import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import { CyclicMeasure, ICyclicMeasureRepository } from './types/cyclic-measure.repository.interface';
import { CreateCyclicMeasureInput } from './dto/create-cyclic-measure.input';
import { UpdateCyclicMeasureInput } from './dto/update-cyclic-measure.input';

@Injectable()
export class CyclicMeasureRepository implements ICyclicMeasureRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async createCyclicMeasure({
		maintenanceType,
		surveyId,
		unitId,
		planYear,
		finalPlanYear,
		costSurcharge,
		remarks,
		cycle,
		unitPrice,
		quantityUnitOfMeasurement,
		defaultMaintenanceMeasureId,
		defectId,
		failureModeId,
	}: CreateCyclicMeasureInput): Promise<CyclicMeasure> {
		const data: Prisma.cyclicMeasuresCreateInput = {
			id: newId(),
			maintenanceType: maintenanceType,
			surveys: { connect: { id: surveyId } },
			units: { connect: { id: unitId } },
			planYear,
			finalPlanYear,
			costSurcharge,
			remarks,
			cycle,
			unitPrice,
			quantityUnitOfMeasurement: quantityUnitOfMeasurement,
			defaultMaintenanceMeasures: { connect: { id: defaultMaintenanceMeasureId } },
			defects: {
				connect: {
					id: defectId,
				},
			},
			failureModes: {
				connect: {
					id: failureModeId,
				},
			},
		};

		return this.prisma.cyclicMeasures.create({ data });
	}

	async findCyclicMeasures(surveyId: string): Promise<CyclicMeasure[]> {
		return this.prisma.cyclicMeasures.findMany({
			where: {
				surveyId,
			},
		});
	}

	async updateCyclicMeasure({
		id,
		planYear,
		finalPlanYear,
		costSurcharge,
		remarks,
		cycle,
		unitPrice,
		quantityUnitOfMeasurement,
		maintenanceType,
	}: UpdateCyclicMeasureInput): Promise<CyclicMeasure> {
		const data: Prisma.cyclicMeasuresUpdateInput = {
			planYear,
			finalPlanYear,
			costSurcharge,
			remarks,
			cycle,
			unitPrice,
			quantityUnitOfMeasurement,
			maintenanceType,
		};

		return this.prisma.cyclicMeasures.update({
			where: { id },
			data,
		});
	}

	async deleteCyclicMeasure(identifier: string): Promise<CyclicMeasure> {
		const data: Prisma.cyclicMeasuresUpdateInput = {
			deleted_at: new Date(),
		};

		return this.prisma.cyclicMeasures.update({
			where: { id: identifier },
			data,
		});
	}
}
