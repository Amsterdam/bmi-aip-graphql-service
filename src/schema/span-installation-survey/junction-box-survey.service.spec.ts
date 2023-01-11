import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { JunctionBoxSurveyService } from './junction-box-survey.service';
import { JunctionBoxSurveyRepository } from './junction-box-survey.repository';
import { domainJunctionBoxSurvey } from './__stubs__';
import { JunctionBoxSurveyFactory } from './junction-box-survey.factory';
import { JunctionBoxSurvey } from './models/junction-box-survey.model';

jest.mock('./junction-box-survey.repository');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const repo = new JunctionBoxSurveyRepository(prismaServiceMock);

const junctionBoxId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('Span Installation Survey / JunctionBox / Service', () => {
	test('getJunctionBoxSurvey returns a JunctionBoxSurvey object', async () => {
		const service = new JunctionBoxSurveyService(repo);
		const survey = await service.getJunctionBoxSurvey(junctionBoxId);
		expect(survey).toBeInstanceOf(JunctionBoxSurvey);
		expect(survey).toEqual(JunctionBoxSurveyFactory.CreateJunctionBoxSurvey(domainJunctionBoxSurvey));
	});
});
