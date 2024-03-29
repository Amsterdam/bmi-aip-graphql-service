import { Prisma } from '@prisma/client';

import { SpanMeasureItem as DomainSpanMeasureItem } from '../span-installation/types/span-measure-item.repository.interface';
import { newId } from '../../utils/newId';

import { SpanMeasureItem } from './models/span-measure-item.model';
import { SaveSpanMeasureItemsInput } from './dto/save-span-measure-items-input';

export class SpanMeasureItemFactory {
	static CreateSpanMeasureItem({
		id,
		description,
		optionId,
		spanMeasureId,
		itemType,
		quantityUnitOfMeasurement,
		quantityEstimate,
		quantityActual,
		isActive,
	}: DomainSpanMeasureItem): SpanMeasureItem {
		const spanMeasureItem = new SpanMeasureItem();
		spanMeasureItem.id = id;
		spanMeasureItem.optionId = optionId;
		spanMeasureItem.description = description;
		spanMeasureItem.spanMeasureId = spanMeasureId;
		spanMeasureItem.itemType = itemType;
		spanMeasureItem.quantityUnitOfMeasurement = quantityUnitOfMeasurement;
		spanMeasureItem.quantityEstimate = quantityEstimate;

		if (quantityActual !== null) {
			spanMeasureItem.quantityActual = quantityActual;
		}

		spanMeasureItem.isActive = isActive;
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
		}));
	}
}
