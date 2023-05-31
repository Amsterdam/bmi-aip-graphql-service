import { Injectable } from '@nestjs/common';

import { SpanMeasureItemRepository } from './span-measure-item.repository';
import { SpanMeasureItemFactory } from './span-measure-item.factory';
import { SpanMeasureItem } from './models/span-measure-item.model';
import { SpanMeasureItemStatus } from './types/span-measure-item-status';

@Injectable()
export class SpanMeasureItemService {
	public constructor(private readonly SpanMeasureItemsRepo: SpanMeasureItemRepository) {}

	async findSpanMeasureItems(spanMeasureId: string): Promise<SpanMeasureItem[]> {
		return (await this.SpanMeasureItemsRepo.findSpanMeasureItems(spanMeasureId)).map((spanMeasureItem) =>
			SpanMeasureItemFactory.CreateSpanMeasureItem(spanMeasureItem),
		);
	}

	async findActiveSpanMeasureItems(spanMeasureId: string): Promise<SpanMeasureItem[]> {
		return (await this.SpanMeasureItemsRepo.findActiveSpanMeasureItems(spanMeasureId)).map((spanMeasureItem) =>
			SpanMeasureItemFactory.CreateSpanMeasureItem(spanMeasureItem),
		);
	}

	determineSpanMeasureItemStatus(spanMeasureItem: SpanMeasureItem): SpanMeasureItemStatus {
		if (spanMeasureItem.quantityEstimate && spanMeasureItem.quantityActual) {
			return SpanMeasureItemStatus.completed;
		}

		if (spanMeasureItem.isActive) {
			return SpanMeasureItemStatus.isActive;
		}

		if (spanMeasureItem.quantityEstimate !== null) {
			return SpanMeasureItemStatus.proposal;
		}

		return SpanMeasureItemStatus.open;
	}
}
