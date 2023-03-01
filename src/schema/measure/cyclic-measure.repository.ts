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
		};

		if (failureModeId) {
			data.failureModes = {
				connect: {
					id: failureModeId,
				},
			};
		}

		if (defectId) {
			data.defects = {
				connect: {
					id: defectId,
				},
			};
		}

		return this.prisma.cyclicMeasures.create({ data });
	}

	async findCyclicMeasures(surveyId: string): Promise<CyclicMeasure[]> {
		return this.prisma.cyclicMeasures.findMany({
			where: {
				surveyId,
			},
		});
	}

	async findExistingCyclicMeasure(
		surveyId: string,
		unitId: string,
		defaultMaintenanceMeasureId: string,
	): Promise<CyclicMeasure> {
		return this.prisma.cyclicMeasures.findFirst({
			where: {
				surveyId,
				unitId,
				defaultMaintenanceMeasureId,
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
		defectId,
		failureModeId,
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

		if (failureModeId) {
			data.failureModes = {
				connect: {
					id: failureModeId,
				},
			};
		}

		if (defectId) {
			data.defects = {
				connect: {
					id: defectId,
				},
			};
		}

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

	async surveyContainsMeasures(surveyId: string): Promise<boolean> {
		const cyclicMeasures = await this.prisma.cyclicMeasures.findMany({
			where: {
				surveyId: surveyId,
			},
		});

		return cyclicMeasures.length > 0;
	}
}
