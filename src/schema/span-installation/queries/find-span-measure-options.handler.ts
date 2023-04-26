import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { spanMeasureOptions } from '../types';
import { SpanMeasureOption } from '../models/span-measure-option.model';

import { FindSpanMeasureOptionsQuery } from './find-span-measure-options.query';

@QueryHandler(FindSpanMeasureOptionsQuery)
export class FindSpanMeasureOptionsHandler implements IQueryHandler<FindSpanMeasureOptionsQuery> {
	async execute(query: FindSpanMeasureOptionsQuery): Promise<SpanMeasureOption[]> {
		return spanMeasureOptions;
	}
}
