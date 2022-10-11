import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { LuminaireSurveyRepository } from './luminaire-survey.repository';
import { domainLuminaireSurvey, createLuminaireSurveyInput, updateLuminaireSurveyInput } from './__stubs__';
import { LuminaireSurveyNotFoundException } from './exceptions/luminaire-survey-not-found.exception';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	spanLuminaireSurveys: {
		create: jest.fn().mockResolvedValue(domainLuminaireSurvey),
		findFirst: jest.fn().mockResolvedValue(domainLuminaireSurvey),
		update: jest.fn().mockResolvedValue(domainLuminaireSurvey),
	},
	...(<any>{}),
};

let repository: LuminaireSurveyRepository;

const luminaireId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('Span Installation Survey / Luminaire / Repository', () => {
	beforeEach(() => {
		repository = new LuminaireSurveyRepository(prismaServiceMock);
	});

	describe('getLuminaireSurvey()', () => {
		test('returns luminaire survey', async () => {
			const survey = await repository.getLuminaireSurvey(luminaireId);
			expect(prismaServiceMock.spanLuminaireSurveys.findFirst).toHaveBeenCalledWith({
				where: { luminaireId },
			});
			expect(survey).toEqual(domainLuminaireSurvey);
		});

		test('throws an exception when not found', async () => {
			prismaServiceMock.spanLuminaireSurveys.findFirst.mockResolvedValueOnce(null);
			await expect(repository.getLuminaireSurvey(luminaireId)).rejects.toThrow(LuminaireSurveyNotFoundException);
		});
	});

	test('createLuminaireSurvey()', async () => {
		const returnValue = await repository.createLuminaireSurvey(createLuminaireSurveyInput);
		const survey = prismaServiceMock.spanLuminaireSurveys.create.mock.calls[0][0].data;
		expect(survey).toEqual(
			expect.objectContaining({
				luminaireDamage: true,
				remarks: '__REMARKS__',
				spanLuminaires: {
					connect: {
						id: '83ca470b-768a-49a7-a59f-4fe5da5620cf',
					},
				},
			}),
		);
		expect(typeof survey.id).toBe('string');
		expect(returnValue).toEqual(
			expect.objectContaining({
				...createLuminaireSurveyInput,
			}),
		);
	});

	test('updateLuminaireSurvey()', async () => {
		prismaServiceMock.spanLuminaireSurveys.update.mockResolvedValue(domainLuminaireSurvey);
		const returnValue = await repository.updateLuminaireSurvey(updateLuminaireSurveyInput);
		expect(prismaServiceMock.spanLuminaireSurveys.update).toHaveBeenCalledWith({
			where: { id: updateLuminaireSurveyInput.id },
			data: {
				remarks: '__REMARKS__',
				luminaireDamage: true,
			},
		});
		expect(returnValue).toEqual({
			id: '796229bf-1b54-4bb7-a7d4-acb0dc3062df',
			luminaireDamage: true,
			luminaireId: '83ca470b-768a-49a7-a59f-4fe5da5620cf',
			remarks: '__REMARKS__',
		});
	});
});
