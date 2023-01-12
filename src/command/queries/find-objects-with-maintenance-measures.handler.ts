import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { MigrateMaintenanceMeasuresService } from '../migrate-maintenance-measures.service';
import { ObjectWithMaintenanceMeasuresModel } from '../models/object-with-maintenance-measures.model';

import { FindObjectsWithMaintenanceMeasuresQuery } from './find-objects-with-maintenance-measures.query';

@QueryHandler(FindObjectsWithMaintenanceMeasuresQuery)
export class FindObjectsWithMaintenanceMeasuresHandler
	implements IQueryHandler<FindObjectsWithMaintenanceMeasuresQuery>
{
	constructor(private service: MigrateMaintenanceMeasuresService) {}

	async execute(query: FindObjectsWithMaintenanceMeasuresQuery): Promise<ObjectWithMaintenanceMeasuresModel[]> {
		return this.service.findObjectsWithMaintenanceMeasures();
	}
}
