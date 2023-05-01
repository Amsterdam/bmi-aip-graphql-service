import { MockedObjectDeep } from 'ts-jest';

import { SpanMeasureRepository } from '../span-measure.repository';
import { createSpanMeasureInput, domainSpanMeasure } from '../__stubs__';

import { CreateSpanMeasureCommand } from './create-span-measure.command';
import { CreateSpanMeasureHandler } from './create-span-measure.handler';

const spanMeasureRepoMock: MockedObjectDeep<SpanMeasureRepository> = {
	createSpanMeasure: jest.fn().mockResolvedValue(domainSpanMeasure),
	...(<any>{}),
};

describe('CreateSpanMeasureHandler', () => {
	test('executes command', async () => {
		const command = new CreateSpanMeasureCommand(createSpanMeasureInput);
		const result = await new CreateSpanMeasureHandler(spanMeasureRepoMock).execute(command);

		expect(spanMeasureRepoMock.createSpanMeasure).toHaveBeenCalledTimes(1);
		expect(spanMeasureRepoMock.createSpanMeasure).toHaveBeenCalledWith(createSpanMeasureInput);

		expect(result).toEqual(domainSpanMeasure);
	});
});
