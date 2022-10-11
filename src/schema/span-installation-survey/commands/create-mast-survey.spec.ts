import { MockedObjectDeep } from 'ts-jest';

import { MastSurveyRepository } from '../mast-survey.repository';
import { createMastSurveyInput, domainMastSurvey } from '../__stubs__';

import { CreateMastSurveyCommand } from './create-mast-survey.command';
import { CreateMastSurveyHandler } from './create-mast-survey.handler';

const tensionWireSurveyRepoMock: MockedObjectDeep<MastSurveyRepository> = {
	createMastSurvey: jest.fn().mockResolvedValue(domainMastSurvey),
	...(<any>{}),
};

describe('CreateMastSurveyHandler', () => {
	test('executes command', async () => {
		const command = new CreateMastSurveyCommand(createMastSurveyInput);
		const result = await new CreateMastSurveyHandler(tensionWireSurveyRepoMock).execute(command);

		expect(tensionWireSurveyRepoMock.createMastSurvey).toHaveBeenCalledTimes(1);
		expect(tensionWireSurveyRepoMock.createMastSurvey).toHaveBeenCalledWith(createMastSurveyInput);

		expect(result).toEqual(domainMastSurvey);
	});
});
