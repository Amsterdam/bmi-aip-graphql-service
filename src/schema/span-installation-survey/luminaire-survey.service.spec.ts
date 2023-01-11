import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { LuminaireSurveyService } from './luminaire-survey.service';
import { LuminaireSurveyRepository } from './luminaire-survey.repository';
import { domainLuminaireSurvey } from './__stubs__';
import { LuminaireSurveyFactory } from './luminaire-survey.factory';
import { LuminaireSurvey } from './models/luminaire-survey.model';

jest.mock('./luminaire-survey.repository');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const repo = new LuminaireSurveyRepository(prismaServiceMock);

const luminaireId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('Span Installation Survey / Luminaire / Service', () => {
	test('getLuminaireSurvey returns a LuminaireSurvey object', async () => {
		const service = new LuminaireSurveyService(repo);
		const survey = await service.getLuminaireSurvey(luminaireId);
		expect(survey).toBeInstanceOf(LuminaireSurvey);
		expect(survey).toEqual(LuminaireSurveyFactory.CreateLuminaireSurvey(domainLuminaireSurvey));
	});
});
