import { Prisma } from '@prisma/client';

import { SpanMeasureItem as DomainSpanMeasureItem } from '../span-installation/types/span-measure-item.repository.interface';
import { newId } from '../../utils/newId';

import { SpanMeasureItem } from './models/span-measure-item.model';
import { SaveSpanMeasureItemsInput } from './dto/save-span-measure-items-input';
import { SpanMeasureItemStatus } from './types/span-measure-item-status';

export class SpanMeasureItemFactory {
	static CreateSpanMeasureItem({
		id,
		description,
		optionId,
		spanMeasureId,
		itemType,
		quantityUnitOfMeasurement,
		quantityEstimate,
		status,
	}: DomainSpanMeasureItem): SpanMeasureItem {
		const spanMeasureItem = new SpanMeasureItem();
		spanMeasureItem.id = id;
		spanMeasureItem.optionId = optionId;
		spanMeasureItem.description = description;
		spanMeasureItem.spanMeasureId = spanMeasureId;
		spanMeasureItem.itemType = itemType;
		spanMeasureItem.quantityUnitOfMeasurement = quantityUnitOfMeasurement;
		spanMeasureItem.quantityEstimate = quantityEstimate;
		spanMeasureItem.status = SpanMeasureItemStatus[status];
		return spanMeasureItem;
	}

	static FormatSpanMeasureItems(input: SaveSpanMeasureItemsInput): Prisma.spanMeasureItemsCreateManyInput[] {
		return input.spanMeasureItems.map((data) => ({
			id: newId(),
			optionId: data.optionId,
			description: data.description,
			spanMeasureId: input.spanMeasureId,
			itemType: data.itemType,
			quantityUnitOfMeasurement: data.quantityUnitOfMeasurement,
			quantityEstimate: data.quantityEstimate,
			status: data.status,
		}));
	}
}
