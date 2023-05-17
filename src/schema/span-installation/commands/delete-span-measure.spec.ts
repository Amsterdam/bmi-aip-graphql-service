import { MockedObjectDeep } from 'ts-jest';

import { domainSpanMeasure } from '../__stubs__/span-measure';
import { SpanMeasureRepository } from '../span-measure.repository';

import { DeleteSpanMeasureCommand } from './delete-span-measure.command';
import { DeleteSpanMeasureHandler } from './delete-span-measure.handler';

const SpanMeasureRepoMock: MockedObjectDeep<SpanMeasureRepository> = {
	deleteSpanMeasure: jest.fn().mockResolvedValue(domainSpanMeasure),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('DeleteSpanMeasureHandler', () => {
	test('executes command', async () => {
		const command = new DeleteSpanMeasureCommand(identifier);
		const result = await new DeleteSpanMeasureHandler(SpanMeasureRepoMock).execute(command);

		expect(SpanMeasureRepoMock.deleteSpanMeasure).toHaveBeenCalledTimes(1);
		expect(SpanMeasureRepoMock.deleteSpanMeasure).toHaveBeenCalledWith(identifier);

		expect(result).toEqual(domainSpanMeasure);
	});
});
