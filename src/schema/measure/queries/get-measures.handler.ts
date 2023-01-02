import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { MeasureService } from '../measure.service';
import { Measure } from '../models/measure.model';

import { GetMeasuresQuery } from './get-measures.query';

@QueryHandler(GetMeasuresQuery)
export class GetMeasuresHandler implements IQueryHandler<GetMeasuresQuery> {
	constructor(private service: MeasureService) {}

	async execute(query: GetMeasuresQuery): Promise<Measure[]> {
		return this.service.getMeasures(query.unitId);
	}
}
