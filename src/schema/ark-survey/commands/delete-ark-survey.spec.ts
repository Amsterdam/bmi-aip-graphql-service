import { MockedObjectDeep } from 'ts-jest';

import { ArkSurveyRepository } from '../ark-survey.repository';
import { domainArkSurvey } from '../__stubs__';

import { DeleteArkSurveyCommand } from './delete-ark-survey.command';
import { DeleteArkSurveyHandler } from './delete-ark-survey.handler';

const ArkSurveyRepoMock: MockedObjectDeep<ArkSurveyRepository> = {
	deleteArkSurvey: jest.fn().mockResolvedValue(domainArkSurvey),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('DeleteArkSurveyHandler', () => {
	test('executes command', async () => {
		const command = new DeleteArkSurveyCommand(identifier);
		const result = await new DeleteArkSurveyHandler(ArkSurveyRepoMock).execute(command);

		expect(ArkSurveyRepoMock.deleteArkSurvey).toHaveBeenCalledTimes(1);
		expect(ArkSurveyRepoMock.deleteArkSurvey).toHaveBeenCalledWith(identifier);

		expect(result).toEqual(domainArkSurvey);
	});
});
