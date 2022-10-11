import { MockedObjectDeep } from 'ts-jest';

import { TensionWireSurveyService } from '../tension-wire-survey.service';
import { tensionWireSurvey } from '../__stubs__';

import { GetTensionWireSurveyQuery } from './get-tension-wire-survey.query';
import { GetTensionWireSurveyHandler } from './get-tension-wire-survey.handler';

const tensionWireSurveyServiceMock: MockedObjectDeep<TensionWireSurveyService> = {
	getTensionWireSurvey: jest.fn().mockResolvedValue(tensionWireSurvey),
	...(<any>{}),
};

const surveyId = '82580f03-5fe9-4554-aa85-6c0fe28a693d';
const supportSystemId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('GetTensionWireSurveyHandler', () => {
	test('executes query', async () => {
		const command = new GetTensionWireSurveyQuery(surveyId, supportSystemId);
		const result = await new GetTensionWireSurveyHandler(tensionWireSurveyServiceMock).execute(command);

		expect(tensionWireSurveyServiceMock.getTensionWireSurvey).toHaveBeenCalledTimes(1);
		expect(tensionWireSurveyServiceMock.getTensionWireSurvey).toHaveBeenCalledWith(surveyId, supportSystemId);

		expect(result).toEqual(tensionWireSurvey);
	});
});
