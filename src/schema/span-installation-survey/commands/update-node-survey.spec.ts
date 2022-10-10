import { MockedObjectDeep } from 'ts-jest';

import { NodeSurveyRepository } from '../node-survey.repository';
import { updateNodeSurveyInput, domainNodeSurvey } from '../__stubs__';

import { UpdateNodeSurveyCommand } from './update-node-survey.command';
import { UpdateNodeSurveyHandler } from './update-node-survey.handler';

const tensionWireSurveyRepoMock: MockedObjectDeep<NodeSurveyRepository> = {
	updateNodeSurvey: jest.fn().mockResolvedValue(domainNodeSurvey),
	...(<any>{}),
};

describe('UpdateNodeSurveyHandler', () => {
	test('executes command', async () => {
		const command = new UpdateNodeSurveyCommand(updateNodeSurveyInput);
		const result = await new UpdateNodeSurveyHandler(tensionWireSurveyRepoMock).execute(command);

		expect(tensionWireSurveyRepoMock.updateNodeSurvey).toHaveBeenCalledTimes(1);
		expect(tensionWireSurveyRepoMock.updateNodeSurvey).toHaveBeenCalledWith(updateNodeSurveyInput);

		expect(result).toEqual(domainNodeSurvey);
	});
});
