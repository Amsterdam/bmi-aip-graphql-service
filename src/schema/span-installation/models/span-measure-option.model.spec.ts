import { SpanMeasureOption } from './span-measure-option.model';

describe('Span Installation / Model / SpanMeasure', () => {
	test('constructs a spanMeasure instance', () => {
		const spanMeasureOption = new SpanMeasureOption();
		spanMeasureOption.id = '71c5450a-c0a3-48ea-adbb-ea435a8804d5';

		expect(spanMeasureOption).toBeInstanceOf(SpanMeasureOption);
		expect(spanMeasureOption).toEqual({
			id: '71c5450a-c0a3-48ea-adbb-ea435a8804d5',
		});
	});
});
