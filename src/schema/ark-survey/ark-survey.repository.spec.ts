import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { ArkSurveyRepository } from './ark-survey.repository';
import { domainArkSurvey, createArkSurveyInput } from './__stubs__';

jest.mock('./types/ark-survey.repository.interface');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	arkSurveys: {
		create: jest.fn().mockResolvedValue(domainArkSurvey),
		findMany: jest.fn().mockResolvedValue([domainArkSurvey]),
		update: jest.fn().mockResolvedValue(domainArkSurvey),
	},
	$executeRaw: jest.fn(),
	$queryRaw: jest.fn(),
	...(<any>{}),
};

let repository: ArkSurveyRepository;

describe('ARK/ ArkSurvey / Repository', () => {
	beforeEach(() => {
		repository = new ArkSurveyRepository(prismaServiceMock);
	});

	test('createArkSurvey()', async () => {
		const returnValue = await repository.createArkSurvey(createArkSurveyInput);
		const ArkSurvey = prismaServiceMock.arkSurveys.create.mock.calls[0][0].data;
		expect(ArkSurvey).toEqual(
			expect.objectContaining({
				id: ArkSurvey.id,
				surveys: {
					connect: {
						id: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
					},
				},
			}),
		);
		expect(returnValue).toEqual(
			expect.objectContaining({
				...createArkSurveyInput,
			}),
		);
	});
});
