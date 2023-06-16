import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { spanMeasureOptions } from '../types';
import { SpanMeasureOption } from '../models/span-measure-option.model';

import { FindSpanMeasureOptionsQuery } from './find-span-measure-options.query';

@QueryHandler(FindSpanMeasureOptionsQuery)
export class FindSpanMeasureOptionsHandler implements IQueryHandler<FindSpanMeasureOptionsQuery> {
	async execute({ decompositionItemType }: FindSpanMeasureOptionsQuery): Promise<SpanMeasureOption[]> {
		if (decompositionItemType) {
			return spanMeasureOptions.filter(
				(spanMeasureOption) => spanMeasureOption.decompositionItemType === decompositionItemType,
			);
		}
		return spanMeasureOptions;
	}
}
