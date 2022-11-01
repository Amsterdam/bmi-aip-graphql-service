import { MockedObjectDeep } from 'ts-jest';

import { FacadeSurveyRepository } from '../facade-survey.repository';
import { updateFacadeSurveyInput, domainFacadeSurvey } from '../__stubs__';

import { UpdateFacadeSurveyCommand } from './update-facade-survey.command';
import { UpdateFacadeSurveyHandler } from './update-facade-survey.handler';

const tensionWireSurveyRepoMock: MockedObjectDeep<FacadeSurveyRepository> = {
	updateFacadeSurvey: jest.fn().mockResolvedValue(domainFacadeSurvey),
	...(<any>{}),
};

describe('UpdateFacadeSurveyHandler', () => {
	test('executes command', async () => {
		const command = new UpdateFacadeSurveyCommand(updateFacadeSurveyInput);
		const result = await new UpdateFacadeSurveyHandler(tensionWireSurveyRepoMock).execute(command);

		expect(tensionWireSurveyRepoMock.updateFacadeSurvey).toHaveBeenCalledTimes(1);
		expect(tensionWireSurveyRepoMock.updateFacadeSurvey).toHaveBeenCalledWith(updateFacadeSurveyInput);

		expect(result).toEqual(domainFacadeSurvey);
	});
});
