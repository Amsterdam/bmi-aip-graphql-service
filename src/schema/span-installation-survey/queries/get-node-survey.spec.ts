import { MockedObjectDeep } from 'ts-jest';

import { NodeSurveyService } from '../node-survey.service';
import { nodeSurvey } from '../__stubs__';

import { GetNodeSurveyQuery } from './get-node-survey.query';
import { GetNodeSurveyHandler } from './get-node-survey.handler';

const nodeSurveyServiceMock: MockedObjectDeep<NodeSurveyService> = {
	getNodeSurvey: jest.fn().mockResolvedValue(nodeSurvey),
	...(<any>{}),
};

const surveyId = '82580f03-5fe9-4554-aa85-6c0fe28a693d';
const supportSystemId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('GetNodeSurveyHandler', () => {
	test('executes query', async () => {
		const command = new GetNodeSurveyQuery(surveyId, supportSystemId);
		const result = await new GetNodeSurveyHandler(nodeSurveyServiceMock).execute(command);

		expect(nodeSurveyServiceMock.getNodeSurvey).toHaveBeenCalledTimes(1);
		expect(nodeSurveyServiceMock.getNodeSurvey).toHaveBeenCalledWith(surveyId, supportSystemId);

		expect(result).toEqual(nodeSurvey);
	});
});
