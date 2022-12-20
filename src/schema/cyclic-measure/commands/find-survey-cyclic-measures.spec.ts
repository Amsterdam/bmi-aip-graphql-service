import { MockedObjectDeep } from 'ts-jest';

import { cyclicMeasure1, cyclicMeasure2 } from '../__stubs__';
import { CyclicMeasureService } from '../cyclic-measure.service';
import { FindSurveyCyclicMeasuresCommand } from '../commands/find-survey-cyclic-measures.command';
import { FindSurveyCyclicMeasuresHandler } from '../commands/find-survey-cyclic-measures.handler';

const cyclicMeasureServiceMock: MockedObjectDeep<CyclicMeasureService> = {
	getCyclicMeasures: jest.fn().mockResolvedValue([cyclicMeasure1, cyclicMeasure2]),
	...(<any>{}),
};

describe('FindSurveyCyclicMeasuresCommand', () => {
	test('executes command', async () => {
		const command = new FindSurveyCyclicMeasuresCommand('__UNIT_ID__');
		const result = await new FindSurveyCyclicMeasuresHandler(cyclicMeasureServiceMock).execute(command);

		expect(cyclicMeasureServiceMock.getCyclicMeasures).toHaveBeenCalledTimes(1);
		expect(cyclicMeasureServiceMock.getCyclicMeasures).toHaveBeenCalledWith('__UNIT_ID__');

		expect(result).toEqual([cyclicMeasure1, cyclicMeasure2]);
	});
});
