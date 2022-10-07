import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { SupportSystemSurveyNotFoundException } from './exceptions/support-system-survey-not-found.exception';
import { TensionWireSurveyRepository } from './tension-wire-survey.repository';
import { domainTensionWireSurvey, createTensionWireSurveyInput, updateTensionWireSurveyInput } from './__stubs__';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	spanSupportSystemTensionWireSurveys: {
		create: jest.fn().mockResolvedValue(domainTensionWireSurvey),
		findFirst: jest.fn().mockResolvedValue(domainTensionWireSurvey),
		update: jest.fn().mockResolvedValue(domainTensionWireSurvey),
	},
	...(<any>{}),
};

let repository: TensionWireSurveyRepository;

const surveyId = '82580f03-5fe9-4554-aa85-6c0fe28a693d';
const supportSystemId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('Span Installation Survey / Tension Wire / Repository', () => {
	beforeEach(() => {
		repository = new TensionWireSurveyRepository(prismaServiceMock);
	});

	describe('getTensionWireSurvey()', () => {
		test('returns tension wire survey', async () => {
			const survey = await repository.getTensionWireSurvey(surveyId, supportSystemId);
			expect(prismaServiceMock.spanSupportSystemTensionWireSurveys.findFirst).toHaveBeenCalledWith({
				where: { surveyId, supportSystemId },
			});
			expect(survey).toEqual(domainTensionWireSurvey);
		});

		test('throws an exception when not found', async () => {
			prismaServiceMock.spanSupportSystemTensionWireSurveys.findFirst.mockResolvedValueOnce(null);
			await expect(repository.getTensionWireSurvey(surveyId, supportSystemId)).rejects.toThrow(
				SupportSystemSurveyNotFoundException,
			);
		});
	});

	test('createTensionWireSurvey()', async () => {
		const returnValue = await repository.createTensionWireSurvey(createTensionWireSurveyInput);
		const survey = prismaServiceMock.spanSupportSystemTensionWireSurveys.create.mock.calls[0][0].data;
		expect(survey).toEqual(
			expect.objectContaining({
				faultyMontage: true,
				gaffTerminalDamage: true,
				gaffTerminalMissingParts: true,
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
				tensionWireClampDamage: true,
				tensionWireDamage: true,
				thirdPartyObjectsAttached: true,
			}),
		);
		expect(typeof survey.id).toBe('string');
		expect(returnValue).toEqual(
			expect.objectContaining({
				...createTensionWireSurveyInput,
			}),
		);
	});

	test('updateTensionWireSurvey()', async () => {
		prismaServiceMock.spanSupportSystemTensionWireSurveys.update.mockResolvedValue(domainTensionWireSurvey);
		const returnValue = await repository.updateTensionWireSurvey(updateTensionWireSurveyInput);
		expect(prismaServiceMock.spanSupportSystemTensionWireSurveys.update).toHaveBeenCalledWith({
			where: { id: updateTensionWireSurveyInput.id },
			data: {
				faultyMontage: true,
				gaffTerminalDamage: true,
				gaffTerminalMissingParts: true,
				remarks: '__REMARKS__',
				tensionWireClampDamage: true,
				tensionWireDamage: true,
				thirdPartyObjectsAttached: true,
			},
		});
		expect(returnValue).toEqual({
			faultyMontage: true,
			gaffTerminalDamage: true,
			gaffTerminalMissingParts: true,
			id: '796229bf-1b54-4bb7-a7d4-acb0dc3062df',
			remarks: '__REMARKS__',
			supportSystemId: '83ca470b-768a-49a7-a59f-4fe5da5620cf',
			surveyId: '9003d096-4dd2-4d0d-b74b-9406a721d94d',
			tensionWireClampDamage: true,
			tensionWireDamage: true,
			thirdPartyObjectsAttached: true,
		});
	});
});
