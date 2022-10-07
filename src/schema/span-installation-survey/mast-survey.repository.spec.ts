import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { SupportSystemSurveyNotFoundException } from './exceptions/support-system-survey-not-found.exception';
import { MastSurveyRepository } from './mast-survey.repository';
import { domainMastSurvey, createMastSurveyInput, updateMastSurveyInput } from './__stubs__';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	spanSupportSystemMastSurveys: {
		create: jest.fn().mockResolvedValue(domainMastSurvey),
		findFirst: jest.fn().mockResolvedValue(domainMastSurvey),
		update: jest.fn().mockResolvedValue(domainMastSurvey),
	},
	...(<any>{}),
};

let repository: MastSurveyRepository;

const surveyId = '82580f03-5fe9-4554-aa85-6c0fe28a693d';
const supportSystemId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('Span Installation Survey / Mast / Repository', () => {
	beforeEach(() => {
		repository = new MastSurveyRepository(prismaServiceMock);
	});

	describe('getMastSurvey()', () => {
		test('returns mast survey', async () => {
			const survey = await repository.getMastSurvey(surveyId, supportSystemId);
			expect(prismaServiceMock.spanSupportSystemMastSurveys.findFirst).toHaveBeenCalledWith({
				where: { surveyId, supportSystemId },
			});
			expect(survey).toEqual(domainMastSurvey);
		});

		test('throws an exception when not found', async () => {
			prismaServiceMock.spanSupportSystemMastSurveys.findFirst.mockResolvedValueOnce(null);
			await expect(repository.getMastSurvey(surveyId, supportSystemId)).rejects.toThrow(
				SupportSystemSurveyNotFoundException,
			);
		});
	});

	test('createMastSurvey()', async () => {
		const returnValue = await repository.createMastSurvey(createMastSurveyInput);
		const survey = prismaServiceMock.spanSupportSystemMastSurveys.create.mock.calls[0][0].data;
		expect(survey).toEqual(
			expect.objectContaining({
				mastAttachmentDamage: true,
				mastBracketDamage: true,
				mastBracketMissingParts: true,
				mastDamage: true,
				mastMissingParts: true,
				tensionMastAngle: 10,
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
				...createMastSurveyInput,
			}),
		);
	});

	test('updateMastSurvey()', async () => {
		prismaServiceMock.spanSupportSystemMastSurveys.update.mockResolvedValue(domainMastSurvey);
		const returnValue = await repository.updateMastSurvey(updateMastSurveyInput);
		expect(prismaServiceMock.spanSupportSystemMastSurveys.update).toHaveBeenCalledWith({
			where: { id: updateMastSurveyInput.id },
			data: {
				remarks: '__REMARKS__',
				mastAttachmentDamage: true,
				mastBracketDamage: true,
				mastBracketMissingParts: true,
				mastDamage: true,
				mastMissingParts: true,
				tensionMastAngle: 10,
			},
		});
		expect(returnValue).toEqual({
			id: '796229bf-1b54-4bb7-a7d4-acb0dc3062df',
			mastAttachmentDamage: true,
			mastBracketDamage: true,
			mastBracketMissingParts: true,
			mastDamage: true,
			mastMissingParts: true,
			remarks: '__REMARKS__',
			supportSystemId: '83ca470b-768a-49a7-a59f-4fe5da5620cf',
			surveyId: '9003d096-4dd2-4d0d-b74b-9406a721d94d',
			tensionMastAngle: 10,
		});
	});
});
