import { MockedObjectDeep } from 'ts-jest';

import { SpanMeasureRepository } from '../span-measure.repository';
import { UpdateSpanMeasureInput, UpdateSpanMeasureNormalizedInput, domainSpanMeasure } from '../__stubs__';

import { UpdateSpanMeasureCommand } from './update-span-measure.command';
import { UpdateSpanMeasureHandler } from './update-span-measure.handler';

const SpanMeasureRepoMock: MockedObjectDeep<SpanMeasureRepository> = {
	UpdateSpanMeasure: jest.fn().mockResolvedValue(domainSpanMeasure),
	...(<any>{}),
};

describe('UpdateSpanMeasureHandler', () => {
	test('executes command', async () => {
		const command = new UpdateSpanMeasureCommand(UpdateSpanMeasureInput);
		const result = await new UpdateSpanMeasureHandler(SpanMeasureRepoMock).execute(command);

		expect(SpanMeasureRepoMock.updateSpanMeasure).toHaveBeenCalledTimes(1);
		expect(SpanMeasureRepoMock.updateSpanMeasure).toHaveBeenCalledWith(UpdateSpanMeasureNormalizedInput);

		expect(result).toEqual(domainSpanMeasure);
	});
});
