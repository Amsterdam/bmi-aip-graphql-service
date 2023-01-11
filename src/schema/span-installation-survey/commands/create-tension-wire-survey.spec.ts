import { MockedObjectDeep } from 'ts-jest';

import { TensionWireSurveyRepository } from '../tension-wire-survey.repository';
import { createTensionWireSurveyInput, domainTensionWireSurvey } from '../__stubs__';

import { CreateTensionWireSurveyCommand } from './create-tension-wire-survey.command';
import { CreateTensionWireSurveyHandler } from './create-tension-wire-survey.handler';

const tensionWireSurveyRepoMock: MockedObjectDeep<TensionWireSurveyRepository> = {
	createTensionWireSurvey: jest.fn().mockResolvedValue(domainTensionWireSurvey),
	...(<any>{}),
};

describe('CreateTensionWireSurveyHandler', () => {
	test('executes command', async () => {
		const command = new CreateTensionWireSurveyCommand(createTensionWireSurveyInput);
		const result = await new CreateTensionWireSurveyHandler(tensionWireSurveyRepoMock).execute(command);

		expect(tensionWireSurveyRepoMock.createTensionWireSurvey).toHaveBeenCalledTimes(1);
		expect(tensionWireSurveyRepoMock.createTensionWireSurvey).toHaveBeenCalledWith(createTensionWireSurveyInput);

		expect(result).toEqual(domainTensionWireSurvey);
	});
});
