import { MockedObjectDeep } from 'ts-jest';

import { MastSurveyService } from '../mast-survey.service';
import { mastSurvey } from '../__stubs__';

import { GetMastSurveyQuery } from './get-mast-survey.query';
import { GetMastSurveyHandler } from './get-mast-survey.handler';

const mastSurveyServiceMock: MockedObjectDeep<MastSurveyService> = {
	getMastSurvey: jest.fn().mockResolvedValue(mastSurvey),
	...(<any>{}),
};

const surveyId = '82580f03-5fe9-4554-aa85-6c0fe28a693d';
const supportSystemId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('GetMastSurveyHandler', () => {
	test('executes query', async () => {
		const command = new GetMastSurveyQuery(surveyId, supportSystemId);
		const result = await new GetMastSurveyHandler(mastSurveyServiceMock).execute(command);

		expect(mastSurveyServiceMock.getMastSurvey).toHaveBeenCalledTimes(1);
		expect(mastSurveyServiceMock.getMastSurvey).toHaveBeenCalledWith(surveyId, supportSystemId);

		expect(result).toEqual(mastSurvey);
	});
});
