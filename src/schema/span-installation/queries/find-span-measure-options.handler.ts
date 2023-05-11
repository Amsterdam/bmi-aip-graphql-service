import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { SpanMeasureOption } from '../models/span-measure-option.model';
import { SpanMeasureOptionRepository } from '../span-measure-option.repository';

import { FindSpanMeasureOptionsQuery } from './find-span-measure-options.query';

@QueryHandler(FindSpanMeasureOptionsQuery)
export class FindSpanMeasureOptionsHandler implements IQueryHandler<FindSpanMeasureOptionsQuery> {
	constructor(private repository: SpanMeasureOptionRepository) {}

	async execute(query: FindSpanMeasureOptionsQuery): Promise<SpanMeasureOption[]> {
		return this.repository.findSpanMeasureOptions();
	}
}
