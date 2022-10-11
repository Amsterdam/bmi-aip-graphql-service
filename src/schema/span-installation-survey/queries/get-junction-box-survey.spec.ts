import { MockedObjectDeep } from 'ts-jest';

import { JunctionBoxSurveyService } from '../junction-box-survey.service';
import { mastSurvey } from '../__stubs__';

import { GetJunctionBoxSurveyQuery } from './get-junction-box-survey.query';
import { GetJunctionBoxSurveyHandler } from './get-junction-box-survey.handler';

const mastSurveyServiceMock: MockedObjectDeep<JunctionBoxSurveyService> = {
	getJunctionBoxSurvey: jest.fn().mockResolvedValue(mastSurvey),
	...(<any>{}),
};

const surveyId = '82580f03-5fe9-4554-aa85-6c0fe28a693d';
const junctionBoxId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('GetJunctionBoxSurveyHandler', () => {
	test('executes query', async () => {
		const command = new GetJunctionBoxSurveyQuery(surveyId, junctionBoxId);
		const result = await new GetJunctionBoxSurveyHandler(mastSurveyServiceMock).execute(command);

		expect(mastSurveyServiceMock.getJunctionBoxSurvey).toHaveBeenCalledTimes(1);
		expect(mastSurveyServiceMock.getJunctionBoxSurvey).toHaveBeenCalledWith(surveyId, junctionBoxId);

		expect(result).toEqual(mastSurvey);
	});
});
