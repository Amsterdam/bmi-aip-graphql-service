import { SpanDecompositionData } from './span-decomposition-data.model';

describe('SpanDecompositionData', () => {
	test('constructs a SpanDecompositionData instance', () => {
		const spanDecompositionData = new SpanDecompositionData();
		spanDecompositionData.remarks = '__TEST__';

		expect(spanDecompositionData).toBeInstanceOf(SpanDecompositionData);
	});
});
