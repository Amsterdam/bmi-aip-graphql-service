import { SpanMeasureItem } from './span-measure-item.model';

describe('OVS MeasureItem', () => {
	test('constructs a SpanMeasureItem instance', () => {
		const spanMeasureItem = new SpanMeasureItem();
		spanMeasureItem.id = '71c5450a-c0a3-48ea-adbb-ea435a8804d5';
		spanMeasureItem.spanMeasureId = '388ecaaa-c6c2-4613-aa14-f206cf577ca7';
		spanMeasureItem.itemType = '__TYPE__';
		spanMeasureItem.quantityUnitOfMeasurement = 'm2';
		spanMeasureItem.quantityEstimate = 2;
		spanMeasureItem.quantityActual = 3;

		expect(spanMeasureItem).toBeInstanceOf(SpanMeasureItem);
	});
});
