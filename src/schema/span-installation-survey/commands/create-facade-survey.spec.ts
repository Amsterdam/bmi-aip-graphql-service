import { MockedObjectDeep } from 'ts-jest';

import { FacadeSurveyRepository } from '../facade-survey.repository';
import { createFacadeSurveyInput, domainFacadeSurvey } from '../__stubs__';

import { CreateFacadeSurveyCommand } from './create-facade-survey.command';
import { CreateFacadeSurveyHandler } from './create-facade-survey.handler';

const tensionWireSurveyRepoMock: MockedObjectDeep<FacadeSurveyRepository> = {
	createFacadeSurvey: jest.fn().mockResolvedValue(domainFacadeSurvey),
	...(<any>{}),
};

describe('CreateFacadeSurveyHandler', () => {
	test('executes command', async () => {
		const command = new CreateFacadeSurveyCommand(createFacadeSurveyInput);
		const result = await new CreateFacadeSurveyHandler(tensionWireSurveyRepoMock).execute(command);

		expect(tensionWireSurveyRepoMock.createFacadeSurvey).toHaveBeenCalledTimes(1);
		expect(tensionWireSurveyRepoMock.createFacadeSurvey).toHaveBeenCalledWith(createFacadeSurveyInput);

		expect(result).toEqual(domainFacadeSurvey);
	});
});
