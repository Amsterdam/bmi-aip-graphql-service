import { MockedObjectDeep } from 'ts-jest';

import { LuminaireSurveyRepository } from '../luminaire-survey.repository';
import { createLuminaireSurveyInput, domainLuminaireSurvey } from '../__stubs__';

import { CreateLuminaireSurveyCommand } from './create-luminaire-survey.command';
import { CreateLuminaireSurveyHandler } from './create-luminaire-survey.handler';

const tensionWireSurveyRepoMock: MockedObjectDeep<LuminaireSurveyRepository> = {
	createLuminaireSurvey: jest.fn().mockResolvedValue(domainLuminaireSurvey),
	...(<any>{}),
};

describe('CreateLuminaireSurveyHandler', () => {
	test('executes command', async () => {
		const command = new CreateLuminaireSurveyCommand(createLuminaireSurveyInput);
		const result = await new CreateLuminaireSurveyHandler(tensionWireSurveyRepoMock).execute(command);

		expect(tensionWireSurveyRepoMock.createLuminaireSurvey).toHaveBeenCalledTimes(1);
		expect(tensionWireSurveyRepoMock.createLuminaireSurvey).toHaveBeenCalledWith(createLuminaireSurveyInput);

		expect(result).toEqual(domainLuminaireSurvey);
	});
});
