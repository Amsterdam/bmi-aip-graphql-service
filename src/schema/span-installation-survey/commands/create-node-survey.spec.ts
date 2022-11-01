import { MockedObjectDeep } from 'ts-jest';

import { NodeSurveyRepository } from '../node-survey.repository';
import { createNodeSurveyInput, domainNodeSurvey } from '../__stubs__';

import { CreateNodeSurveyCommand } from './create-node-survey.command';
import { CreateNodeSurveyHandler } from './create-node-survey.handler';

const tensionWireSurveyRepoMock: MockedObjectDeep<NodeSurveyRepository> = {
	createNodeSurvey: jest.fn().mockResolvedValue(domainNodeSurvey),
	...(<any>{}),
};

describe('CreateNodeSurveyHandler', () => {
	test('executes command', async () => {
		const command = new CreateNodeSurveyCommand(createNodeSurveyInput);
		const result = await new CreateNodeSurveyHandler(tensionWireSurveyRepoMock).execute(command);

		expect(tensionWireSurveyRepoMock.createNodeSurvey).toHaveBeenCalledTimes(1);
		expect(tensionWireSurveyRepoMock.createNodeSurvey).toHaveBeenCalledWith(createNodeSurveyInput);

		expect(result).toEqual(domainNodeSurvey);
	});
});
