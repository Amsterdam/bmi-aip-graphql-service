import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { SurveyRepository } from './survey.repository';
import { domainSurvey, survey1, surveyInput } from './__stubs__';
import { InspectionStandard } from './types';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	surveys: {
		create: jest.fn().mockResolvedValue(domainSurvey),
	},
	...(<any>{}),
};

const surveyRepoMock: MockedObjectDeep<SurveyRepository> = {
	getSurveyById: jest.fn().mockResolvedValue(survey1),
	...(<any>{}),
};

const repo = new SurveyRepository(prismaServiceMock);

describe('SurveyRepository', () => {
	test('createSurvey()', async () => {
		await repo.createSurvey(surveyInput);
		expect(prismaServiceMock.surveys.create).toHaveBeenCalledWith({
			data: expect.objectContaining({
				condition: '__CONDITION__',
				description: '__DESCRIPTION__',
				inspectionStandardType: InspectionStandard.spanInstallation,
				objects: {
					connect: {
						id: 'f45c302c-6b18-85f6-bbe4-b3bf0a82d49a',
					},
				},
				status: '__STATUS__',
				surveryedOn: undefined,
				updatedOn: undefined,
			}),
		});
	});

	test('getSurvey()', async () => {
		const surveys = await surveyRepoMock.getSurveyById('0deb07f3-28f5-47e1-b72a-d1b2a19d4670');
		expect(surveys).toEqual({
			description: '__DESCRIPTION__',
			id: '0deb07f3-28f5-47e1-b72a-d1b2a19d4670',
			inspectionStandardType: InspectionStandard.spanInstallation,
			status: '__STATUS__',
		});
	});
});
