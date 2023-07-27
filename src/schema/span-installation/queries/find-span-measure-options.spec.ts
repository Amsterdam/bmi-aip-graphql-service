import { spanMeasureOptions } from '../types';
import { SpanDecompositionItemType } from '../types/span-decomposition-item-type';

import { FindSpanMeasureOptionsHandler } from './find-span-measure-options.handler';
import { FindSpanMeasureOptionsQuery } from './find-span-measure-options.query';

describe('FindSpanMeasureOptionsHandler', () => {
	test('executes command', async () => {
		const query = new FindSpanMeasureOptionsQuery(SpanDecompositionItemType.spanJunctionBox);
		const result = await new FindSpanMeasureOptionsHandler().execute(query);

		expect(result).toBeInstanceOf(Array);
		expect(result).toEqual(
			spanMeasureOptions.filter(
				(spanMeasureOption) =>
					spanMeasureOption.decompositionItemType === SpanDecompositionItemType.spanJunctionBox,
			),
		);
	});
});
