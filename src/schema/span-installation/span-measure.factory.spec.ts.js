import { MeasureFactory } from './span-measure.factory';

describe('Span Installation / measures / Factory', () => {
	test('CreateMeasure() constructs an instance of a Measure GraphQL model', () => {
		const result = MeasureFactory.CreateMeasures({
			name: 'test',
		});
		expect(result).toEqual({});
	});
});
