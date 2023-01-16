import { MockedObjectDeep } from 'ts-jest';

import { ArkSurveyRepository } from '../ark-survey.repository';
import { domainArkSurvey, updateArkSurveyInput } from '../__stubs__';

import { UpdateArkSurveyCommand } from './update-ark-survey.command';
import { UpdateArkSurveyHandler } from './update-ark-survey.handler';

const ArkSurveyRepoMock: MockedObjectDeep<ArkSurveyRepository> = {
	updateArkSurvey: jest.fn().mockResolvedValue(domainArkSurvey),
	...(<any>{}),
};

describe('UpdateArkSurveyHandler', () => {
	test('executes command', async () => {
		const command = new UpdateArkSurveyCommand(updateArkSurveyInput);
		const result = await new UpdateArkSurveyHandler(ArkSurveyRepoMock).execute(command);

		expect(ArkSurveyRepoMock.updateArkSurvey).toHaveBeenCalledTimes(1);

		expect(result).toEqual(domainArkSurvey);
	});
});
