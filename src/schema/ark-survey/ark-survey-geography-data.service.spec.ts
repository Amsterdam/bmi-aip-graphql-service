import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { ArkSurveyGeographyDataService } from './ark-survey-geography-data.service';
import { ArkSurveyGeographyDataRepository } from './ark-survey-geography-data.repository';
import { domainArkSurveyGeographyData } from './__stubs__';
import { ArkSurveyGeographyDataFactory } from './ark-survey-geography-data.factory';
import { ArkSurveyGeographyData } from './models/ark-survey-geography-data.model';

jest.mock('./ark-survey-geography-data.repository');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const repo = new ArkSurveyGeographyDataRepository(prismaServiceMock);

describe('ARK Reach Segments / Service', () => {
	test('getGeographyData returns an array of ArkSurveyGeographyData objects', async () => {
		const service = new ArkSurveyGeographyDataService(repo);
		const ArkSurveyGeographyDataResults = await service.getGeographyData('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(ArkSurveyGeographyDataResults).toBeInstanceOf(Array);
		expect(ArkSurveyGeographyDataResults[0]).toBeInstanceOf(ArkSurveyGeographyData);
		expect(ArkSurveyGeographyDataResults).toEqual(
			[domainArkSurveyGeographyData].map((arkSurveyGeographyData) =>
				ArkSurveyGeographyDataFactory.createArkSurveyGeographyData(arkSurveyGeographyData),
			),
		);
	});
});
