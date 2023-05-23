import { SpanDecompositionData } from './models/span-decomposition-data.model';
import { SpanDecompositionDataFactory } from './span-decomposition-data.factory';
import { supportSystem, domainSupportSystem } from './__stubs__';

describe('Span decomposition data / Factory', () => {
	test('createSpanDecompositionDataFFromJSONB() constructs an instance of a SpanDecompositionData GraphQL model', () => {
		const result = SpanDecompositionDataFactory.CreateSpanDecompositionDataFFromJSONB(
			domainSupportSystem.spanDecompositionData,
		);
		const object = {
			...supportSystem.spanDecompositionData,
		};

		expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(SpanDecompositionData);
	});
});
