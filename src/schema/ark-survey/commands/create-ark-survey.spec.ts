import { MockedObjectDeep } from 'ts-jest';

import { ArkSurveyRepository } from '../ark-survey.repository';
import { createArkSurveyInput, domainArkSurvey } from '../__stubs__';

import { CreateArkSurveyCommand } from './create-ark-survey.command';
import { CreateArkSurveyHandler } from './create-ark-survey.handler';

const ArkSurveyRepoMock: MockedObjectDeep<ArkSurveyRepository> = {
	createArkSurvey: jest.fn().mockResolvedValue(domainArkSurvey),
	...(<any>{}),
};

describe('CreateArkSurveyHandler', () => {
	test('executes command', async () => {
		const command = new CreateArkSurveyCommand(createArkSurveyInput);
		const result = await new CreateArkSurveyHandler(ArkSurveyRepoMock).execute(command);

		expect(ArkSurveyRepoMock.createArkSurvey).toHaveBeenCalledTimes(1);
		expect(ArkSurveyRepoMock.createArkSurvey).toHaveBeenCalledWith(createArkSurveyInput);

		expect(result).toEqual(domainArkSurvey);
	});
});
