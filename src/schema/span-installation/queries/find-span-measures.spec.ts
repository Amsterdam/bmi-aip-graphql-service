import { MockedObjectDeep } from 'ts-jest';

import { domainSpanMeasure } from '../__stubs__/span-measure';
import { SpanMeasureService } from '../span-measure.service';

import { FindSpanMeasuresHandler } from './find-span-measures.handler';
import { FindSpanMeasuresQuery } from './find-span-measures.query';

const spanMeasuresMock: MockedObjectDeep<SpanMeasureService> = {
	findSpanMeasures: jest.fn().mockResolvedValue([domainSpanMeasure]),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('FindSpanMeasures', () => {
	test('executes command', async () => {
		const command = new FindSpanMeasuresQuery(identifier);
		const result = await new FindSpanMeasuresHandler(spanMeasuresMock).execute(command);

		expect(spanMeasuresMock.findSpanMeasures).toHaveBeenCalledTimes(1);
		expect(spanMeasuresMock.findSpanMeasures).toHaveBeenCalledWith(identifier);

		expect(result).toEqual([domainSpanMeasure]);
	});
});
