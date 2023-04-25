import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { SpanMeasure } from './../models/span-measure.model';
import { FindSpanMeasuresQuery } from './find-span-measures.query';
import { spanMeasures } from './../types';

@QueryHandler(FindSpanMeasuresQuery)
export class FindSpanMeasuresHandler implements IQueryHandler<FindSpanMeasuresQuery> {
	async execute(query: FindSpanMeasuresQuery): Promise<SpanMeasure[]> {
		return spanMeasures;
	}
}
