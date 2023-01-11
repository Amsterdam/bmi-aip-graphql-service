import { MockedObjectDeep } from 'ts-jest';

import { LuminaireSurveyRepository } from '../luminaire-survey.repository';
import { updateLuminaireSurveyInput, domainLuminaireSurvey } from '../__stubs__';

import { UpdateLuminaireSurveyCommand } from './update-luminaire-survey.command';
import { UpdateLuminaireSurveyHandler } from './update-luminaire-survey.handler';

const tensionWireSurveyRepoMock: MockedObjectDeep<LuminaireSurveyRepository> = {
	updateLuminaireSurvey: jest.fn().mockResolvedValue(domainLuminaireSurvey),
	...(<any>{}),
};

describe('UpdateLuminaireSurveyHandler', () => {
	test('executes command', async () => {
		const command = new UpdateLuminaireSurveyCommand(updateLuminaireSurveyInput);
		const result = await new UpdateLuminaireSurveyHandler(tensionWireSurveyRepoMock).execute(command);

		expect(tensionWireSurveyRepoMock.updateLuminaireSurvey).toHaveBeenCalledTimes(1);
		expect(tensionWireSurveyRepoMock.updateLuminaireSurvey).toHaveBeenCalledWith(updateLuminaireSurveyInput);

		expect(result).toEqual(domainLuminaireSurvey);
	});
});
