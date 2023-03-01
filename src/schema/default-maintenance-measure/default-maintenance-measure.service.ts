import { Injectable } from '@nestjs/common';

import { DefaultMaintenanceMeasureRepository } from './default-maintenance-measure.repository';
import { DefaultMaintenanceMeasureFactory } from './default-maintenance-measure.factory';
import { DefaultMaintenanceMeasure } from './models/default-maintenance-measure.model';

@Injectable()
export class DefaultMaintenanceMeasureService {
	public constructor(private readonly defaultMaintenanceMeasureRepo: DefaultMaintenanceMeasureRepository) {}

	async getDefaultMaintenanceMeasure(id: string) {
		return DefaultMaintenanceMeasureFactory.CreateDefaultMaintenanceMeasure(
			await this.defaultMaintenanceMeasureRepo.getDefaultMaintenanceMeasure(id),
		);
	}

	async getDefaultMaintenanceMeasures(objectTypeUnitCodeId: string): Promise<DefaultMaintenanceMeasure[]> {
		return (
			await this.defaultMaintenanceMeasureRepo.getDefaultMaintenanceMeasureByObjectTypeUnitCodeId(
				objectTypeUnitCodeId,
			)
		).map((defaultMaintenanceMeasure) =>
			DefaultMaintenanceMeasureFactory.CreateDefaultMaintenanceMeasure(defaultMaintenanceMeasure),
		);
	}
}
