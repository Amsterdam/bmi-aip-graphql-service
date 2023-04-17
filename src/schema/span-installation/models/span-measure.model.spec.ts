import { SpanMeasure } from './span-measure.model';

describe('Span Installation / Model / SpanMeasure', () => {
	test('constructs a spanMeasure instance', () => {
		const spanMeasure = new SpanMeasure();
		spanMeasure.id = '71c5450a-c0a3-48ea-adbb-ea435a8804d5';
		spanMeasure.decompositionId = 'cecc214d-1c44-4bcd-94e2-f2d661327db3';
		spanMeasure.decompositionType = 'junction-box';
		spanMeasure.surveyId = '388ecaaa-c6c2-4613-aa14-f206cf577ca7';
		spanMeasure.name = '__NAME__';
		spanMeasure.createdAt = '2022-08-02T15:51:54.044Z';
		spanMeasure.updatedAt = '2022-08-02T15:52:54.044Z';

		expect(spanMeasure).toBeInstanceOf(SpanMeasure);
		expect(spanMeasure).toEqual({
			id: '71c5450a-c0a3-48ea-adbb-ea435a8804d5',
			surveyId: '388ecaaa-c6c2-4613-aa14-f206cf577ca7',
			updatedAt: '2022-08-02T15:52:54.044Z',
			decompositionId: 'cecc214d-1c44-4bcd-94e2-f2d661327db3',
			decompositionType: 'junction-box',
			name: '__NAME__',
			createdAt: '2022-08-02T15:51:54.044Z',
		});
	});
});
