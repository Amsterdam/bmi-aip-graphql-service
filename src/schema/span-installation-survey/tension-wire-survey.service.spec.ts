import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { TensionWireSurveyService } from './tension-wire-survey.service';
import { TensionWireSurveyRepository } from './tension-wire-survey.repository';
import { domainTensionWireSurvey } from './__stubs__';
import { TensionWireSurveyFactory } from './tension-wire-survey.factory';
import { TensionWireSurvey } from './models/tension-wire-survey.model';

jest.mock('./tension-wire-survey.repository');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const repo = new TensionWireSurveyRepository(prismaServiceMock);

const surveyId = '82580f03-5fe9-4554-aa85-6c0fe28a693d';
const supportSystemId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('Span Installation Survey / Tension Wire / Service', () => {
	test('getSupportSystems returns array of SupportSystem objects', async () => {
		const service = new TensionWireSurveyService(repo);
		const survey = await service.getTensionWireSurvey(surveyId, supportSystemId);
		expect(survey).toBeInstanceOf(TensionWireSurvey);
		expect(survey).toEqual(TensionWireSurveyFactory.CreateTensionWireSurvey(domainTensionWireSurvey));
	});
});
