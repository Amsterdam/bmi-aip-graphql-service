import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { CyclicMeasureService } from '../cyclic-measure.service';
import { CyclicMeasure } from '../models/cyclic-measure.model';

import { GetCyclicMeasuresQuery } from './get-cyclic-measures.query';

@QueryHandler(GetCyclicMeasuresQuery)
export class GetCyclicMeasuresHandler implements IQueryHandler<GetCyclicMeasuresQuery> {
	constructor(private service: CyclicMeasureService) {}

	async execute(query: GetCyclicMeasuresQuery): Promise<CyclicMeasure[]> {
		return this.service.getCyclicMeasures(query.unitId);
	}
}
