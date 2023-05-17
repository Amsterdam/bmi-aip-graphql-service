import { MockedObjectDeep } from 'ts-jest';

import { domainSpanMeasure } from '../__stubs__/span-measure';
import { SpanMeasureService } from '../span-measure.service';

import { FindSpanMeasuresByDecompositionIdHandler } from './find-span-measures-by-decomposition-id.handler';
import { FindSpanMeasuresByDecompositionIdCommand } from './find-span-measures-by-decomposition-id.command';

const spanMeasuresMock: MockedObjectDeep<SpanMeasureService> = {
	findSpanMeasuresByDecompositionId: jest.fn().mockResolvedValue([domainSpanMeasure]),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('FindSpanMeasures', () => {
	test('executes command', async () => {
		const command = new FindSpanMeasuresByDecompositionIdCommand(identifier);
		const result = await new FindSpanMeasuresByDecompositionIdHandler(spanMeasuresMock).execute(command);

		expect(spanMeasuresMock.findSpanMeasuresByDecompositionId).toHaveBeenCalledTimes(1);
		expect(spanMeasuresMock.findSpanMeasuresByDecompositionId).toHaveBeenCalledWith(identifier);

		expect(result).toEqual([domainSpanMeasure]);
	});
});
