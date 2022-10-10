import { MockedObjectDeep } from 'ts-jest';

import { FacadeSurveyService } from '../facade-survey.service';
import { facadeSurvey } from '../__stubs__';

import { GetFacadeSurveyQuery } from './get-facade-survey.query';
import { GetFacadeSurveyHandler } from './get-facade-survey.handler';

const facadeSurveyServiceMock: MockedObjectDeep<FacadeSurveyService> = {
	getFacadeSurvey: jest.fn().mockResolvedValue(facadeSurvey),
	...(<any>{}),
};

const surveyId = '82580f03-5fe9-4554-aa85-6c0fe28a693d';
const supportSystemId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('GetFacadeSurveyHandler', () => {
	test('executes query', async () => {
		const command = new GetFacadeSurveyQuery(surveyId, supportSystemId);
		const result = await new GetFacadeSurveyHandler(facadeSurveyServiceMock).execute(command);

		expect(facadeSurveyServiceMock.getFacadeSurvey).toHaveBeenCalledTimes(1);
		expect(facadeSurveyServiceMock.getFacadeSurvey).toHaveBeenCalledWith(surveyId, supportSystemId);

		expect(result).toEqual(facadeSurvey);
	});
});
