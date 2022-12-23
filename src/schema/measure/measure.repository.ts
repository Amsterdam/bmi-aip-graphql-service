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
		unitId,
		planYear,
		finalPlanYear,
		costSurcharge,
		unitPrice,
		quantityUnitOfMeasurement,
		description,
		location,
		quantity,
	}: CreateMeasureInput): Promise<Measure> {
		const data: Prisma.measuresCreateInput = {
			id: newId(),
			maintenanceType: maintenanceType,
			units: { connect: { id: unitId } },
			planYear,
			finalPlanYear,
			costSurcharge,
			unitPrice,
			quantityUnitOfMeasurement: quantityUnitOfMeasurement,
			description,
			location,
			quantity,
		};

		return this.prisma.measures.create({ data });
	}

	async getMeasures(unitId: string): Promise<Measure[]> {
		return this.prisma.measures.findMany({
			where: {
				unitId,
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
