import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { ArkSurveyGeographyDataRepository } from './ark-survey-geography-data.repository';
import { domainArkSurveyGeographyData, createArkSurveyGeographyDataInput } from './__stubs__';

jest.mock('./types/ark-survey-geography-data.repository.interface');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	arkSurveyGeographyData: {
		create: jest.fn().mockResolvedValue(domainArkSurveyGeographyData),
		findMany: jest.fn().mockResolvedValue([domainArkSurveyGeographyData]),
		update: jest.fn().mockResolvedValue(domainArkSurveyGeographyData),
	},
	$executeRaw: jest.fn(),
	$queryRaw: jest.fn(),
	...(<any>{}),
};

let repository: ArkSurveyGeographyDataRepository;

describe('ARK/ ArkSurveyGeographyData / Repository', () => {
	beforeEach(() => {
		repository = new ArkSurveyGeographyDataRepository(prismaServiceMock);
	});

	test('createArkSurveyGeographyData()', async () => {
		const returnValue = await repository.createArkSurveyGeographyData(createArkSurveyGeographyDataInput);
		const ArkSurveyGeographyData = prismaServiceMock.arkSurveyGeographyData.create.mock.calls[0][0].data;
		expect(ArkSurveyGeographyData).toEqual(
			expect.objectContaining({
				id: ArkSurveyGeographyData.id,
				surveys: {
					connect: {
						id: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
					},
				},
			}),
		);
		expect(returnValue).toEqual(
			expect.objectContaining({
				...createArkSurveyGeographyDataInput,
			}),
		);
	});
});
