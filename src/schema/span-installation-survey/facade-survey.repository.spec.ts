import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { SupportSystemSurveyNotFoundException } from './exceptions/support-system-survey-not-found.exception';
import { FacadeSurveyRepository } from './facade-survey.repository';
import { domainFacadeSurvey, createFacadeSurveyInput, updateFacadeSurveyInput } from './__stubs__';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	spanSupportSystemFacadeSurveys: {
		create: jest.fn().mockResolvedValue(domainFacadeSurvey),
		findFirst: jest.fn().mockResolvedValue(domainFacadeSurvey),
		update: jest.fn().mockResolvedValue(domainFacadeSurvey),
	},
	...(<any>{}),
};

let repository: FacadeSurveyRepository;

const surveyId = '82580f03-5fe9-4554-aa85-6c0fe28a693d';
const supportSystemId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('Span Installation Survey / Facade / Repository', () => {
	beforeEach(() => {
		repository = new FacadeSurveyRepository(prismaServiceMock);
	});

	describe('getFacadeSurvey()', () => {
		test('returns facade survey', async () => {
			const survey = await repository.getFacadeSurvey(surveyId, supportSystemId);
			expect(prismaServiceMock.spanSupportSystemFacadeSurveys.findFirst).toHaveBeenCalledWith({
				where: { surveyId, supportSystemId },
			});
			expect(survey).toEqual(domainFacadeSurvey);
		});

		test('throws an exception when not found', async () => {
			prismaServiceMock.spanSupportSystemFacadeSurveys.findFirst.mockResolvedValueOnce(null);
			await expect(repository.getFacadeSurvey(surveyId, supportSystemId)).rejects.toThrow(
				SupportSystemSurveyNotFoundException,
			);
		});
	});

	test('createFacadeSurvey()', async () => {
		const returnValue = await repository.createFacadeSurvey(createFacadeSurveyInput);
		const survey = prismaServiceMock.spanSupportSystemFacadeSurveys.create.mock.calls[0][0].data;
		expect(survey).toEqual(
			expect.objectContaining({
				facadeDamageWithin1m: true,
				hinderingVegetation: true,
				wallPlateDamage: true,
				faultyMontage: true,
				nutNotFullyOverThreadedRod: true,
				missingFasteners: true,
				measuredPreload: 10,
				appliedAdditionalTraction: 2,
				facadeConnectionFailed: true,
				facadeConnectionFailureAdditionalTraction: 3,
				remarks: '__REMARKS__',
				spanSupportSystems: {
					connect: {
						id: '83ca470b-768a-49a7-a59f-4fe5da5620cf',
					},
				},
				surveys: {
					connect: {
						id: '9003d096-4dd2-4d0d-b74b-9406a721d94d',
					},
				},
			}),
		);
		expect(typeof survey.id).toBe('string');
		expect(returnValue).toEqual(
			expect.objectContaining({
				...createFacadeSurveyInput,
			}),
		);
	});

	test('updateFacadeSurvey()', async () => {
		prismaServiceMock.spanSupportSystemFacadeSurveys.update.mockResolvedValue(domainFacadeSurvey);
		const returnValue = await repository.updateFacadeSurvey(updateFacadeSurveyInput);
		expect(prismaServiceMock.spanSupportSystemFacadeSurveys.update).toHaveBeenCalledWith({
			where: { id: updateFacadeSurveyInput.id },
			data: {
				remarks: '__REMARKS__',
				facadeDamageWithin1m: true,
				hinderingVegetation: true,
				wallPlateDamage: true,
				faultyMontage: true,
				nutNotFullyOverThreadedRod: true,
				missingFasteners: true,
				measuredPreload: 10,
				appliedAdditionalTraction: 2,
				facadeConnectionFailed: true,
				facadeConnectionFailureAdditionalTraction: 3,
			},
		});
		expect(returnValue).toEqual({
			id: '796229bf-1b54-4bb7-a7d4-acb0dc3062df',
			remarks: '__REMARKS__',
			supportSystemId: '83ca470b-768a-49a7-a59f-4fe5da5620cf',
			surveyId: '9003d096-4dd2-4d0d-b74b-9406a721d94d',
			facadeDamageWithin1m: true,
			hinderingVegetation: true,
			wallPlateDamage: true,
			faultyMontage: true,
			nutNotFullyOverThreadedRod: true,
			missingFasteners: true,
			measuredPreload: 10,
			appliedAdditionalTraction: 2,
			facadeConnectionFailed: true,
			facadeConnectionFailureAdditionalTraction: 3,
		});
	});
});
