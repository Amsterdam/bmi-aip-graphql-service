import { MockedObjectDeep } from 'ts-jest';

import { JunctionBoxSurveyRepository } from '../junction-box-survey.repository';
import { updateJunctionBoxSurveyInput, domainJunctionBoxSurvey } from '../__stubs__';

import { UpdateJunctionBoxSurveyCommand } from './update-junction-box-survey.command';
import { UpdateJunctionBoxSurveyHandler } from './update-junction-box-survey.handler';

const tensionWireSurveyRepoMock: MockedObjectDeep<JunctionBoxSurveyRepository> = {
	updateJunctionBoxSurvey: jest.fn().mockResolvedValue(domainJunctionBoxSurvey),
	...(<any>{}),
};

describe('UpdateJunctionBoxSurveyHandler', () => {
	test('executes command', async () => {
		const command = new UpdateJunctionBoxSurveyCommand(updateJunctionBoxSurveyInput);
		const result = await new UpdateJunctionBoxSurveyHandler(tensionWireSurveyRepoMock).execute(command);

		expect(tensionWireSurveyRepoMock.updateJunctionBoxSurvey).toHaveBeenCalledTimes(1);
		expect(tensionWireSurveyRepoMock.updateJunctionBoxSurvey).toHaveBeenCalledWith(updateJunctionBoxSurveyInput);

		expect(result).toEqual(domainJunctionBoxSurvey);
	});
});
