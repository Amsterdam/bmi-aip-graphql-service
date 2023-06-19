import { MockedObjectDeep } from 'ts-jest';

import { domainSpanMeasure } from '../__stubs__/span-measure';
import { SpanMeasureService } from '../span-measure.service';

import { FindSpanMeasuresByDecompositionItemIdHandler } from './find-span-measures-by-decomposition-item-id.handler';
import { FindSpanMeasuresByDecompositionItemIdQuery } from './find-span-measures-by-decomposition-item-id.query';

const spanMeasuresMock: MockedObjectDeep<SpanMeasureService> = {
	findSpanMeasuresByDecompositionItemId: jest.fn().mockResolvedValue([domainSpanMeasure]),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('FindSpanMeasures', () => {
	test('executes command', async () => {
		const command = new FindSpanMeasuresByDecompositionItemIdQuery(identifier);
		const result = await new FindSpanMeasuresByDecompositionItemIdHandler(spanMeasuresMock).execute(command);

		expect(spanMeasuresMock.findSpanMeasuresByDecompositionItemId).toHaveBeenCalledTimes(1);
		expect(spanMeasuresMock.findSpanMeasuresByDecompositionItemId).toHaveBeenCalledWith(identifier);

		expect(result).toEqual([domainSpanMeasure]);
	});
});
