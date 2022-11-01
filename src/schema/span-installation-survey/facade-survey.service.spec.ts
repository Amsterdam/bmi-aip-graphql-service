import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { FacadeSurveyService } from './facade-survey.service';
import { FacadeSurveyRepository } from './facade-survey.repository';
import { domainFacadeSurvey } from './__stubs__';
import { FacadeSurveyFactory } from './facade-survey.factory';
import { FacadeSurvey } from './models/facade-survey.model';

jest.mock('./facade-survey.repository');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const repo = new FacadeSurveyRepository(prismaServiceMock);

const supportSystemId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('Span Installation Survey / Facade / Service', () => {
	test('getFacadeSurvey returns a FacadeSurvey object', async () => {
		const service = new FacadeSurveyService(repo);
		const survey = await service.getFacadeSurvey(supportSystemId);
		expect(survey).toBeInstanceOf(FacadeSurvey);
		expect(survey).toEqual(FacadeSurveyFactory.CreateFacadeSurvey(domainFacadeSurvey));
	});
});
