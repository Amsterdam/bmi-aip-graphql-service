import { MockedObjectDeep } from 'ts-jest';

import { JunctionBoxSurveyRepository } from '../junction-box-survey.repository';
import { createJunctionBoxSurveyInput, domainJunctionBoxSurvey } from '../__stubs__';

import { CreateJunctionBoxSurveyCommand } from './create-junction-box-survey.command';
import { CreateJunctionBoxSurveyHandler } from './create-junction-box-survey.handler';

const tensionWireSurveyRepoMock: MockedObjectDeep<JunctionBoxSurveyRepository> = {
	createJunctionBoxSurvey: jest.fn().mockResolvedValue(domainJunctionBoxSurvey),
	...(<any>{}),
};

describe('CreateJunctionBoxSurveyHandler', () => {
	test('executes command', async () => {
		const command = new CreateJunctionBoxSurveyCommand(createJunctionBoxSurveyInput);
		const result = await new CreateJunctionBoxSurveyHandler(tensionWireSurveyRepoMock).execute(command);

		expect(tensionWireSurveyRepoMock.createJunctionBoxSurvey).toHaveBeenCalledTimes(1);
		expect(tensionWireSurveyRepoMock.createJunctionBoxSurvey).toHaveBeenCalledWith(createJunctionBoxSurveyInput);

		expect(result).toEqual(domainJunctionBoxSurvey);
	});
});
