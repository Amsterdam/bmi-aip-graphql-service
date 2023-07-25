import { MockedObjectDeep } from 'ts-jest';
import { surveys } from '@prisma/client';

import { PrismaService } from '../../prisma.service';

import { SurveyRepository } from './survey.repository';
import { domainSurvey, survey1, surveyInput } from './__stubs__';
import { InspectionStandard } from './types';
import { SurveyStates } from './types/surveyStates';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	surveys: {
		create: jest.fn().mockResolvedValue(domainSurvey),
		findFirst: jest.fn().mockResolvedValue(domainSurvey),
		findUnique: jest.fn().mockResolvedValue(domainSurvey),
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
				status: SurveyStates.open,
				surveryedOn: undefined,
				updatedOn: undefined,
			}),
		});
	});

	test('getSurvey()', async () => {
		const surveysFromRepo = await surveyRepoMock.getSurveyById('0deb07f3-28f5-47e1-b72a-d1b2a19d4670');
		expect(surveysFromRepo).toEqual({
			description: '__DESCRIPTION__',
			id: '0deb07f3-28f5-47e1-b72a-d1b2a19d4670',
			inspectionStandardType: InspectionStandard.spanInstallation,
			status: SurveyStates.open,
		});
	});

	describe('findPrevousSurveyId()', () => {
		test('returns the id of the survey with the same objectId created prior to the given surveyId, based on the created_at field', async () => {
			prismaServiceMock.surveys.findFirst.mockResolvedValue({
				...domainSurvey,
				id: '__PREVIOUS_SURVEY_ID__',
			} as surveys);

			const resultId = await repo.findIdPreviousNen2767OrFmecaSurvey('__SURVEY_ID__');

			expect(resultId).toEqual('__PREVIOUS_SURVEY_ID__');
		});
	});
});
