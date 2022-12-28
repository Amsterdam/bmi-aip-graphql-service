import { MockedObjectDeep } from 'ts-jest';

import { CyclicMeasureRepository } from '../cyclic-measure.repository';
import { domainCyclicMeasure, updateCyclicMeasureInput } from '../__stubs__';
import { UpdateCyclicMeasureCommand } from '../commands/update-cyclic-measure.command';
import { UpdateCyclicMeasureHandler } from '../commands/update-cyclic-measure.handler';

const cyclicMeasureRepoMock: MockedObjectDeep<CyclicMeasureRepository> = {
	updateCyclicMeasure: jest.fn().mockResolvedValue(domainCyclicMeasure),
	...(<any>{}),
};

describe('UpdateCyclicMeasureHandler', () => {
	test('executes command', async () => {
		const command = new UpdateCyclicMeasureCommand(updateCyclicMeasureInput);
		const result = await new UpdateCyclicMeasureHandler(cyclicMeasureRepoMock).execute(command);

		expect(cyclicMeasureRepoMock.updateCyclicMeasure).toHaveBeenCalledTimes(1);
		expect(cyclicMeasureRepoMock.updateCyclicMeasure).toHaveBeenCalledWith(updateCyclicMeasureInput);

		expect(result).toEqual(domainCyclicMeasure);
	});
});
