import { spanMeasureOptions } from '../types';

import { FindSpanMeasureOptionsHandler } from './find-span-measure-options.handler';
import { FindSpanMeasureOptionsQuery } from './find-span-measure-options.query';

describe('FindSpanMeasureOptionsHandler', () => {
	test('executes command', async () => {
		const query = new FindSpanMeasureOptionsQuery();
		const result = await new FindSpanMeasureOptionsHandler().execute(query);

		expect(result).toBeInstanceOf(Array);
		expect(result).toEqual(spanMeasureOptions);
	});
});
