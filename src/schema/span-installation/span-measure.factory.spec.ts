import { domainSpanMeasure } from './__stubs__';
import { SpanMeasure } from './models/span-measure.model';
import { SpanMeasureFactory } from './span-measure.factory';

describe('Span Installation / SpanMeasure / Factory', () => {
	test('CreateSupportSystem() constructs an instance of a SupportSystem GraphQL model', () => {
		const result = SpanMeasureFactory.CreateSpanMeasure(domainSpanMeasure);
		const object = {
			...domainSpanMeasure,
		};

		expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(SpanMeasure);
	});
});
