import { MockedObjectDeep } from 'ts-jest';

import { TensionWireSurveyService } from '../tension-wire-survey.service';
import { tensionWireSurvey } from '../__stubs__';

import { GetTensionWireSurveyQuery } from './get-tension-wire-survey.query';
import { GetTensionWireSurveyHandler } from './get-tension-wire-survey.handler';

const tensionWireSurveyServiceMock: MockedObjectDeep<TensionWireSurveyService> = {
	getTensionWireSurvey: jest.fn().mockResolvedValue(tensionWireSurvey),
	...(<any>{}),
};

const supportSystemId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('GetTensionWireSurveyHandler', () => {
	test('executes query', async () => {
		const command = new GetTensionWireSurveyQuery(supportSystemId);
		const result = await new GetTensionWireSurveyHandler(tensionWireSurveyServiceMock).execute(command);

		expect(tensionWireSurveyServiceMock.getTensionWireSurvey).toHaveBeenCalledTimes(1);
		expect(tensionWireSurveyServiceMock.getTensionWireSurvey).toHaveBeenCalledWith(supportSystemId);

		expect(result).toEqual(tensionWireSurvey);
	});
});
