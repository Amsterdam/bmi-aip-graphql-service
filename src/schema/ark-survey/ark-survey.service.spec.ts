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
	test('getArkSurvey returns an ArkSurvey object', async () => {
		const service = new ArkSurveyService(repo);
		const ArkSurveyResults = await service.getArkSurvey('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(ArkSurveyResults).toBeInstanceOf(ArkSurvey);
		expect(ArkSurveyResults).toEqual(ArkSurveyFactory.createArkSurvey(domainArkSurvey));
	});

	test('findArkSurveysByAssetCode returns an array of ArkSurveys with reach segments', async () => {
		const service = new ArkSurveyService(repo);
		const assetCode = 'ABC123';

		const result = await service.findArkSurveysByAssetCode(assetCode);

		expect(result).toHaveLength(2);
		expect(result[0]).toBeInstanceOf(ArkSurvey);
		expect(result[0].reachSegments[0].arkSurveyId).toEqual(result[0].id);
	});
});
