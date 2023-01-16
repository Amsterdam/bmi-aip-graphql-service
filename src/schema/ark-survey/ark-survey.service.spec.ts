import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { ArkSurveyService } from './ark-survey.service';
import { ArkSurveyRepository } from './ark-survey.repository';
import { domainArkSurvey } from './__stubs__';
import { ArkSurveyFactory } from './ark-survey.factory';
import { ArkSurvey } from './models/ark-survey.model';

jest.mock('./ark-survey.repository');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const repo = new ArkSurveyRepository(prismaServiceMock);

describe('ARK Reach Segments / Service', () => {
	test('getArkSurveyData returns an array of ArkSurvey objects', async () => {
		const service = new ArkSurveyService(repo);
		const ArkSurveyResults = await service.getArkSurveyData('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(ArkSurveyResults).toBeInstanceOf(Array);
		expect(ArkSurveyResults[0]).toBeInstanceOf(ArkSurvey);
		expect(ArkSurveyResults).toEqual(
			[domainArkSurvey].map((arkSurvey) => ArkSurveyFactory.createArkSurvey(arkSurvey)),
		);
	});
});
