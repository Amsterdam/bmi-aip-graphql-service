import { SpanMeasureItemFactory } from './span-measure-item.factory';
import { domainSpanMeasureItem } from './__stubs__/span-measure-item';
import { SpanMeasureItem } from './models/span-measure-item.model';

describe('OVS / SpanMeasureItem Factory', () => {
	test('CreateSpanMeasureItem() constructs an instance of a SpanMeasure GraphQL model', () => {
		const result = SpanMeasureItemFactory.CreateSpanMeasureItem(domainSpanMeasureItem);
		const object = {
			...domainSpanMeasureItem,
		};

		expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(SpanMeasureItem);
	});
});
