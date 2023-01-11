import { MockedObjectDeep } from 'ts-jest';

import { MastSurveyRepository } from '../mast-survey.repository';
import { updateMastSurveyInput, domainMastSurvey } from '../__stubs__';

import { UpdateMastSurveyCommand } from './update-mast-survey.command';
import { UpdateMastSurveyHandler } from './update-mast-survey.handler';

const tensionWireSurveyRepoMock: MockedObjectDeep<MastSurveyRepository> = {
	updateMastSurvey: jest.fn().mockResolvedValue(domainMastSurvey),
	...(<any>{}),
};

describe('UpdateMastSurveyHandler', () => {
	test('executes command', async () => {
		const command = new UpdateMastSurveyCommand(updateMastSurveyInput);
		const result = await new UpdateMastSurveyHandler(tensionWireSurveyRepoMock).execute(command);

		expect(tensionWireSurveyRepoMock.updateMastSurvey).toHaveBeenCalledTimes(1);
		expect(tensionWireSurveyRepoMock.updateMastSurvey).toHaveBeenCalledWith(updateMastSurveyInput);

		expect(result).toEqual(domainMastSurvey);
	});
});
