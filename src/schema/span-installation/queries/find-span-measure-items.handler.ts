import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { SpanMeasureItemService } from '../span-measure-item.service';
import { SpanMeasureItem } from '../models/span-measure-item.model';

import { FindSpanMeasureItemsQuery } from './find-span-measure-items.query';

@QueryHandler(FindSpanMeasureItemsQuery)
export class FindSpanMeasureItemsHandler implements IQueryHandler<FindSpanMeasureItemsQuery> {
	constructor(private service: SpanMeasureItemService) {}

	async execute(query: FindSpanMeasureItemsQuery): Promise<SpanMeasureItem[]> {
		return this.service.findSpanMeasureItems(query.spanMeasureId);
	}
}
