import { MockedObjectDeep } from 'ts-jest';

import { CyclicMeasureRepository } from '../cyclic-measure.repository';
import { domainCyclicMeasure } from '../__stubs__';

import { DeleteCyclicMeasureCommand } from './delete-cyclic-measure.command';
import { DeleteCyclicMeasureHandler } from './delete-cyclic-measure.handler';

const cyclicMeasureRepoMock: MockedObjectDeep<CyclicMeasureRepository> = {
	deleteCyclicMeasure: jest.fn().mockResolvedValue(domainCyclicMeasure),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('DeleteCyclicMeasureHandler', () => {
	test('executes command', async () => {
		const command = new DeleteCyclicMeasureCommand(identifier);
		const result = await new DeleteCyclicMeasureHandler(cyclicMeasureRepoMock).execute(command);

		expect(cyclicMeasureRepoMock.deleteCyclicMeasure).toHaveBeenCalledTimes(1);
		expect(cyclicMeasureRepoMock.deleteCyclicMeasure).toHaveBeenCalledWith(identifier);

		expect(result).toEqual(domainCyclicMeasure);
	});
});
