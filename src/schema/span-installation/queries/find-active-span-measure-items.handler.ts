import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { SpanMeasureItemService } from '../span-measure-item.service';
import { SpanMeasureItem } from '../models/span-measure-item.model';

import { FindActiveSpanMeasureItemsQuery } from './find-active-span-measure-items.query';

@QueryHandler(FindActiveSpanMeasureItemsQuery)
export class FindActiveSpanMeasureItemsHandler implements IQueryHandler<FindActiveSpanMeasureItemsQuery> {
	constructor(private service: SpanMeasureItemService) {}

	async execute(query: FindActiveSpanMeasureItemsQuery): Promise<SpanMeasureItem[]> {
		return this.service.findActiveSpanMeasureItems(query.spanMeasureId);
	}
}
