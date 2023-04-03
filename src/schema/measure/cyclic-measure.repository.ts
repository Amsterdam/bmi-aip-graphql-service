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
		createdAt,
		updatedAt,
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
			created_at: createdAt,
			updated_at: updatedAt,
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
				deleted_at: null,
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
		updatedAt,
		deletedAt,
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
			updated_at: updatedAt,
			deleted_at: deletedAt ?? null,
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
				deleted_at: null,
			},
		});

		return cyclicMeasures.length > 0;
	}

	async unitHasMeasures(unitId: string): Promise<boolean> {
		const measure = await this.prisma.measures.findMany({
			where: {
				unitId: unitId,
				deleted_at: null,
			},
		});

		return measure.length > 0;
	}

	async findCyclicMeasuresByUnit(unitId: string): Promise<CyclicMeasure[]> {
		return this.prisma.cyclicMeasures.findMany({
			where: {
				unitId,
				deleted_at: null,
			},
		});
	}

	async manifestationHasMeasures(manifestationId: string): Promise<boolean> {
		const measure = await this.prisma.measures.findMany({
			where: {
				manifestationId: manifestationId,
				deleted_at: null,
			},
		});

		return measure.length > 0;
	}
}
