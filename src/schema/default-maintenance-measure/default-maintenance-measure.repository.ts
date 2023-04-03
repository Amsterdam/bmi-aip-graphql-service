import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';

import {
	DefaultMaintenanceMeasure,
	IDefaultMaintenanceMeasureRepository,
} from './types/default-maintenance-measure.repository.interface';

@Injectable()
export class DefaultMaintenanceMeasureRepository implements IDefaultMaintenanceMeasureRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async getDefaultMaintenanceMeasure(defaultMaintenanceMeasureId: string): Promise<DefaultMaintenanceMeasure> {
		return this.prisma.defaultMaintenanceMeasures.findUnique({
			where: {
				id: defaultMaintenanceMeasureId,
			},
		});
	}

	async findDefaultMaintenanceMeasuresByObjectTypeUnitCodeId(
		objectTypeUnitCodeId: string,
		material: string,
		quantityUnitOfMeasurement: string,
	): Promise<DefaultMaintenanceMeasure[]> {
		return this.prisma.defaultMaintenanceMeasures.findMany({
			where: {
				objectTypeUnitCodeId: objectTypeUnitCodeId,
				material: material,
				quantityUnitOfMeasurement: quantityUnitOfMeasurement,
			},
		});
	}
}
