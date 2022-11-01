import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { MastSurveyService } from './mast-survey.service';
import { MastSurveyRepository } from './mast-survey.repository';
import { domainMastSurvey } from './__stubs__';
import { MastSurveyFactory } from './mast-survey.factory';
import { MastSurvey } from './models/mast-survey.model';

jest.mock('./mast-survey.repository');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const repo = new MastSurveyRepository(prismaServiceMock);

const supportSystemId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('Span Installation Survey / Mast / Service', () => {
	test('getMastSurvey returns a MastSurvey object', async () => {
		const service = new MastSurveyService(repo);
		const survey = await service.getMastSurvey(supportSystemId);
		expect(survey).toBeInstanceOf(MastSurvey);
		expect(survey).toEqual(MastSurveyFactory.CreateMastSurvey(domainMastSurvey));
	});
});
