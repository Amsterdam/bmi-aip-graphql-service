import { MockedObjectDeep } from 'ts-jest';

import { measure1, measure2 } from '../__stubs__';
import { MeasureService } from '../measure.service';
import { FindSurveyMeasuresCommand } from '../commands/find-survey-measures.command';
import { FindSurveyMeasuresHandler } from '../commands/find-survey-measures.handler';

const measureServiceMock: MockedObjectDeep<MeasureService> = {
	getMeasures: jest.fn().mockResolvedValue([measure1, measure2]),
	...(<any>{}),
};

describe('FindSurveyMeasuresCommand', () => {
	test('executes command', async () => {
		const command = new FindSurveyMeasuresCommand('__UNIT_ID__');
		const result = await new FindSurveyMeasuresHandler(measureServiceMock).execute(command);

		expect(measureServiceMock.getMeasures).toHaveBeenCalledTimes(1);
		expect(measureServiceMock.getMeasures).toHaveBeenCalledWith('__UNIT_ID__');

		expect(result).toEqual([measure1, measure2]);
	});
});
