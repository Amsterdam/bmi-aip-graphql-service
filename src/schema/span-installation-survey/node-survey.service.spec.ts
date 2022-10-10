import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { NodeSurveyService } from './node-survey.service';
import { NodeSurveyRepository } from './node-survey.repository';
import { domainNodeSurvey } from './__stubs__';
import { NodeSurveyFactory } from './node-survey.factory';
import { NodeSurvey } from './models/node-survey.model';

jest.mock('./node-survey.repository');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const repo = new NodeSurveyRepository(prismaServiceMock);

const surveyId = '82580f03-5fe9-4554-aa85-6c0fe28a693d';
const supportSystemId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('Span Installation Survey / Node / Service', () => {
	test('getNodeSurvey returns a NodeSurvey object', async () => {
		const service = new NodeSurveyService(repo);
		const survey = await service.getNodeSurvey(surveyId, supportSystemId);
		expect(survey).toBeInstanceOf(NodeSurvey);
		expect(survey).toEqual(NodeSurveyFactory.CreateNodeSurvey(domainNodeSurvey));
	});
});
