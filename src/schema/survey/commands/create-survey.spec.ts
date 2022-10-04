import { MockedObjectDeep } from 'ts-jest';

import { SurveyRepository } from '../survey.repository';
import { surveyInput, domainSurvey } from '../__stubs__';
import { SurveyService } from '../survey.service';

import { CreateSurveyCommand } from './create-survey.command';
import { CreateSurveyHandler } from './create-survey.handler';

const surveyRepoMock: MockedObjectDeep<SurveyRepository> = {
	createSurvey: jest.fn().mockResolvedValue(domainSurvey),
	...(<any>{}),
};

describe('CreateSurveyHandler', () => {
	test('executes command', async () => {
		const command = new CreateSurveyCommand(surveyInput);
		const service = new SurveyService(surveyRepoMock);

		const result = await new CreateSurveyHandler(service).execute(command);

		expect(surveyRepoMock.createSurvey).toHaveBeenCalledTimes(1);
		expect(surveyRepoMock.createSurvey).toHaveBeenCalledWith(surveyInput);

		expect(result).toEqual(domainSurvey);
	});
});
