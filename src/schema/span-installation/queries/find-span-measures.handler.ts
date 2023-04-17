import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { SpanMeasureService } from '../span-measure.service';
import { SpanMeasure } from '../models/span-measure.model';

import { FindSpanMeasuresQuery } from './find-span-measures.query';
import { FindSupportSystemsQuery } from './find-support-systems.query';

@QueryHandler(FindSpanMeasuresQuery)
export class FindSpanMeasuresHandler implements IQueryHandler<FindSpanMeasuresQuery> {
	constructor(private service: SpanMeasureService) {}

	async execute(query: FindSupportSystemsQuery): Promise<SpanMeasure[]> {
		return this.service.getSpanMeasures(query.surveyId);
	}
}
