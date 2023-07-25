import { SpanMeasure } from './span-measure.model';

describe('Span Installation / Model / SpanMeasure', () => {
	test('constructs a spanMeasure instance', () => {
		const spanMeasure = new SpanMeasure();
		spanMeasure.id = '71c5450a-c0a3-48ea-adbb-ea435a8804d5';
		spanMeasure.decompositionItemId = 'cecc214d-1c44-4bcd-94e2-f2d661327db3';
		spanMeasure.decompositionItemType = 'junction-box';
		spanMeasure.surveyId = '388ecaaa-c6c2-4613-aa14-f206cf577ca7';
		spanMeasure.description = '__DESCRIPTION__';
		spanMeasure.created_at = '2022-08-02T15:51:54.044Z';
		spanMeasure.updated_at = '2022-08-02T15:52:54.044Z';

		expect(spanMeasure).toBeInstanceOf(SpanMeasure);
		expect(spanMeasure).toEqual({
			id: '71c5450a-c0a3-48ea-adbb-ea435a8804d5',
			surveyId: '388ecaaa-c6c2-4613-aa14-f206cf577ca7',
			updated_at: '2022-08-02T15:52:54.044Z',
			decompositionItemId: 'cecc214d-1c44-4bcd-94e2-f2d661327db3',
			decompositionItemType: 'junction-box',
			description: '__DESCRIPTION__',
			created_at: '2022-08-02T15:51:54.044Z',
		});
	});
});
