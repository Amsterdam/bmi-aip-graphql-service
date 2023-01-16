import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { CyclicMeasureService } from '../cyclic-measure.service';
import { CyclicMeasure } from '../models/cyclic-measure.model';
import { FindCyclicMeasuresQuery } from '../queries/find-cyclic-measures.query';

@QueryHandler(FindCyclicMeasuresQuery)
export class FindCyclicMeasuresHandler implements IQueryHandler<FindCyclicMeasuresQuery> {
	constructor(private service: CyclicMeasureService) {}

	async execute({ surveyId }: FindCyclicMeasuresQuery): Promise<CyclicMeasure[]> {
		return this.service.findCyclicMeasures(surveyId);
	}
}
