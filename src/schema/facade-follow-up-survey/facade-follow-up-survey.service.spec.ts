import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { FacadeFollowUpSurveyService } from './facade-follow-up-survey.service';
import { FacadeFollowUpSurveyRepository } from './facade-follow-up-survey.repository';
import { facadeFollowUpSurveyRaw } from './__stubs__/facade-follow-up-survey-stub';
import { FacadeFollowUpSurveyFactory } from './facade-follow-up-survey.factory';
import { FacadeFollowUpSurvey } from './models/facade-follow-up-survey.model';

jest.mock('./facade-follow-up-survey.repository');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const repo = new FacadeFollowUpSurveyRepository(prismaServiceMock);

describe('Facade follow up survey / Service', () => {
	test('getFacadeFollowUpService returns an facadeFollowUpSurvey object', async () => {
		const service = new FacadeFollowUpSurveyService(repo);
		const FacadeFollowUpSurveyResults = await service.getFacadeFollowUpSurvey(
			'9c612187-581b-4be3-902c-9e8035d1d3b7',
		);
		expect(FacadeFollowUpSurveyResults).toBeInstanceOf(FacadeFollowUpSurvey);
		expect(FacadeFollowUpSurveyResults).toEqual(
			FacadeFollowUpSurveyFactory.createFacadeFollowUpSurvey(facadeFollowUpSurveyRaw),
		);
	});
});
