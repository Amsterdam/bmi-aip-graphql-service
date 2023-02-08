import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { DefaultMaintenanceMeasureService } from '../default-maintenance-measure.service';
import { DefaultMaintenanceMeasure } from '../models/default-maintenance-measure.model';

import { GetDefaultMaintenanceMeasureQuery } from './get-default-maintenance-measure.query';

@QueryHandler(GetDefaultMaintenanceMeasureQuery)
export class GetDefaultMaintenanceMeasureHandler implements IQueryHandler<GetDefaultMaintenanceMeasureQuery> {
	constructor(private service: DefaultMaintenanceMeasureService) {}

	public async execute({ id }: GetDefaultMaintenanceMeasureQuery): Promise<DefaultMaintenanceMeasure> {
		return this.service.getDefaultMaintenanceMeasure(id);
	}
}
