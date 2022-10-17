import { MockedObjectDeep } from 'ts-jest';

import { JunctionBoxSurveyService } from '../junction-box-survey.service';
import { mastSurvey } from '../__stubs__';

import { GetJunctionBoxSurveyQuery } from './get-junction-box-survey.query';
import { GetJunctionBoxSurveyHandler } from './get-junction-box-survey.handler';

const mastSurveyServiceMock: MockedObjectDeep<JunctionBoxSurveyService> = {
	getJunctionBoxSurvey: jest.fn().mockResolvedValue(mastSurvey),
	...(<any>{}),
};

const junctionBoxId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('GetJunctionBoxSurveyHandler', () => {
	test('executes query', async () => {
		const command = new GetJunctionBoxSurveyQuery(junctionBoxId);
		const result = await new GetJunctionBoxSurveyHandler(mastSurveyServiceMock).execute(command);

		expect(mastSurveyServiceMock.getJunctionBoxSurvey).toHaveBeenCalledTimes(1);
		expect(mastSurveyServiceMock.getJunctionBoxSurvey).toHaveBeenCalledWith(junctionBoxId);

		expect(result).toEqual(mastSurvey);
	});
});
