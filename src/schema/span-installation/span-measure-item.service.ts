import { Injectable } from '@nestjs/common';

import { SpanMeasureItemRepository } from './span-measure-item.repository';
import { SpanMeasureItemFactory } from './span-measure-item.factory';
import { SpanMeasureItem } from './models/span-measure-item.model';

@Injectable()
export class SpanMeasureItemService {
	public constructor(private readonly SpanMeasureItemsRepo: SpanMeasureItemRepository) {}

	async findSpanMeasureItems(spanMeasureId: string): Promise<SpanMeasureItem[]> {
		return (await this.SpanMeasureItemsRepo.findSpanMeasureItems(spanMeasureId)).map((spanMeasureItem) =>
			SpanMeasureItemFactory.CreateSpanMeasureItem(spanMeasureItem),
		);
	}
}
