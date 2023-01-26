import { MockedObjectDeep } from 'ts-jest';

import { ArkSurveyRepository } from '../ark-survey.repository';
import { domainArkSurvey, saveArkSurveyInput } from '../__stubs__';

import { SaveArkSurveyCommand } from './save-ark-survey.command';
import { SaveArkSurveyHandler } from './save-ark-survey.handler';

const ArkSurveyRepoMock: MockedObjectDeep<ArkSurveyRepository> = {
	saveArkSurvey: jest.fn().mockResolvedValue(domainArkSurvey),
	...(<any>{}),
};

describe('SaveArkSurveyHandler', () => {
	test('executes command', async () => {
		const command = new SaveArkSurveyCommand(saveArkSurveyInput);
		const result = await new SaveArkSurveyHandler(ArkSurveyRepoMock).execute(command);

		expect(ArkSurveyRepoMock.saveArkSurvey).toHaveBeenCalledTimes(1);

		expect(result).toEqual(domainArkSurvey);
	});
});
