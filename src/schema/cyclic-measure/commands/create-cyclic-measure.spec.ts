import { MockedObjectDeep } from 'ts-jest';

import { CyclicMeasureRepository } from '../cyclic-measure.repository';
import { cyclicMeasureInput, domainCyclicMeasure } from '../__stubs__';

import { CreateCyclicMeasureCommand } from './create-cyclic-measure.command';
import { CreateCyclicMeasureHandler } from './create-cyclic-measure.handler';

const cyclicMeasureRepoMock: MockedObjectDeep<CyclicMeasureRepository> = {
	createCyclicMeasure: jest.fn().mockResolvedValue(domainCyclicMeasure),
	...(<any>{}),
};

describe('CreateCyclicMeasureHandler', () => {
	test('executes command', async () => {
		const command = new CreateCyclicMeasureCommand(cyclicMeasureInput);
		const result = await new CreateCyclicMeasureHandler(cyclicMeasureRepoMock).execute(command);

		expect(cyclicMeasureRepoMock.createCyclicMeasure).toHaveBeenCalledTimes(1);
		expect(cyclicMeasureRepoMock.createCyclicMeasure).toHaveBeenCalledWith(cyclicMeasureInput);

		expect(result).toEqual(domainCyclicMeasure);
	});
});
