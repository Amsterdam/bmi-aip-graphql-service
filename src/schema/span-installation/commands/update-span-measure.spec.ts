import { MockedObjectDeep } from 'ts-jest';

import { SpanMeasureRepository } from '../span-measure.repository';
import { domainSpanMeasure, updateSpanMeasureInput } from '../__stubs__';

import { UpdateSpanMeasureCommand } from './update-span-measure.command';
import { UpdateSpanMeasureHandler } from './update-span-measure.handler';

const SpanMeasureRepoMock: MockedObjectDeep<SpanMeasureRepository> = {
	updateSpanMeasure: jest.fn().mockResolvedValue(domainSpanMeasure),
	...(<any>{}),
};

describe('UpdateSpanMeasureHandler', () => {
	test('executes command', async () => {
		const command = new UpdateSpanMeasureCommand(updateSpanMeasureInput);
		const result = await new UpdateSpanMeasureHandler(SpanMeasureRepoMock).execute(command);

		expect(SpanMeasureRepoMock.updateSpanMeasure).toHaveBeenCalledTimes(1);

		expect(result).toEqual(domainSpanMeasure);
	});
});
