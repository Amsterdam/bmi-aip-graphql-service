import { Injectable } from '@nestjs/common';

import { DefaultMaintenanceMeasureRepository } from './default-maintenance-measure.repository';
import { DefaultMaintenanceMeasureFactory } from './default-maintenance-measure.factory';

@Injectable()
export class DefaultMaintenanceMeasureService {
	public constructor(private readonly defaultMaintenanceMeasureRepo: DefaultMaintenanceMeasureRepository) {}

	public async getDefaultMaintenanceMeasure(id: string) {
		return DefaultMaintenanceMeasureFactory.CreateDefaultMaintenanceMeasure(
			await this.defaultMaintenanceMeasureRepo.getDefaultMaintenanceMeasure(id),
		);
	}
}
