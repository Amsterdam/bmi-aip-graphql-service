import { SpanMeasureItem as DomainSpanMeasureItem } from '../survey/types/span-measure-item.repository.interface';

import { SpanMeasureItem } from './models/span-measure-item.model';

export class SpanMeasureItemFactory {
	static CreateSpanMeasureItem({
		id,
		spanMeasureId,
		itemType,
		quantityUnitOfMeasurement,
		quantityEstimate,
		quantityActual,
	}: DomainSpanMeasureItem): SpanMeasureItem {
		const spanMeasureItem = new SpanMeasureItem();
		spanMeasureItem.id = id;
		spanMeasureItem.spanMeasureId = spanMeasureId;
		spanMeasureItem.itemType = itemType;
		spanMeasureItem.quantityUnitOfMeasurement = quantityUnitOfMeasurement;
		spanMeasureItem.quantityEstimate = quantityEstimate;
		spanMeasureItem.quantityActual = quantityActual;

		return spanMeasureItem;
	}
}
