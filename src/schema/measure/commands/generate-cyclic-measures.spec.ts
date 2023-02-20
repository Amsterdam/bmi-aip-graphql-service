import { MockedObjectDeep } from 'ts-jest';

import { CyclicMeasureRepository } from '../cyclic-measure.repository';
import { cyclicMeasure } from '../__stubs__';
import { GenerateCyclicMeasuresCommand } from '../commands/generate-cyclic-measures.command';
import { GenerateCyclicMeasuresHandler } from '../commands/generate-cyclic-measures.handler';

const cyclicMeasureRepoMock: MockedObjectDeep<CyclicMeasureRepository> = {
	generateCyclicMeasures: jest.fn().mockResolvedValue([cyclicMeasure]),
	...(<any>{}),
};

describe('GenerateMeasuresHandler', () => {
	test('executes command', async () => {
		const command = new GenerateCyclicMeasuresCommand('__SURVEY_ID__');
		const result = await new GenerateCyclicMeasuresHandler(cyclicMeasureRepoMock).execute(command);

		expect(cyclicMeasureRepoMock.generateCyclicMeasures).toHaveBeenCalledTimes(1);
		expect(cyclicMeasureRepoMock.generateCyclicMeasures).toHaveBeenCalledWith('__SURVEY_ID__');

		expect(result).toEqual([cyclicMeasure]);
	});
});
