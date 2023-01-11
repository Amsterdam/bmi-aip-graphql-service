import { MockedObjectDeep } from 'ts-jest';

import { TensionWireSurveyRepository } from '../tension-wire-survey.repository';
import { updateTensionWireSurveyInput, domainTensionWireSurvey } from '../__stubs__';

import { UpdateTensionWireSurveyCommand } from './update-tension-wire-survey.command';
import { UpdateTensionWireSurveyHandler } from './update-tension-wire-survey.handler';

const tensionWireSurveyRepoMock: MockedObjectDeep<TensionWireSurveyRepository> = {
	updateTensionWireSurvey: jest.fn().mockResolvedValue(domainTensionWireSurvey),
	...(<any>{}),
};

describe('UpdateTensionWireSurveyHandler', () => {
	test('executes command', async () => {
		const command = new UpdateTensionWireSurveyCommand(updateTensionWireSurveyInput);
		const result = await new UpdateTensionWireSurveyHandler(tensionWireSurveyRepoMock).execute(command);

		expect(tensionWireSurveyRepoMock.updateTensionWireSurvey).toHaveBeenCalledTimes(1);
		expect(tensionWireSurveyRepoMock.updateTensionWireSurvey).toHaveBeenCalledWith(updateTensionWireSurveyInput);

		expect(result).toEqual(domainTensionWireSurvey);
	});
});
