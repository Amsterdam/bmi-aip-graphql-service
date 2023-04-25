import { MockedObjectDeep } from 'ts-jest';

import { ArkSurveyRepository } from '../ark-survey.repository';
import { domainArkSurvey, updateSurveyInput } from '../__stubs__';

import { SaveArkCompletionCommand } from './save-ark-completion.command';
import { SaveArkCompletionHandler } from './save-ark-completion.handler';

const ArkSurveyRepoMock: MockedObjectDeep<ArkSurveyRepository> = {
	saveArkCompletion: jest.fn().mockResolvedValue(domainArkSurvey),
	...(<any>{}),
};

describe('SaveArkCompletionHandler', () => {
	test('executes command', async () => {
		const command = new SaveArkCompletionCommand(updateSurveyInput);
		const result = await new SaveArkCompletionHandler(ArkSurveyRepoMock).execute(command);

		expect(ArkSurveyRepoMock.saveArkCompletion).toHaveBeenCalledTimes(1);

		expect(result).toEqual(domainArkSurvey);
	});
});
