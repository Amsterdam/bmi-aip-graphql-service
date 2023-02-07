import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';

import {
	DefaultMaintenanceMeasure,
	IDefaultMaintenanceMeasureRepository,
} from './types/default-maintenance-measure.repository.interface';

@Injectable()
export class DefaultMaintenanceMeasureRepository implements IDefaultMaintenanceMeasureRepository {
	public constructor(private readonly prisma: PrismaService) {}

	public async getDefaultMaintenanceMeasure(defaultMaintenanceMeasureId: string): Promise<DefaultMaintenanceMeasure> {
		return this.prisma.defaultMaintenanceMeasures.findUnique({
			where: {
				id: defaultMaintenanceMeasureId,
			},
		});
	}
}
