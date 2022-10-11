import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { JunctionBoxSurveyRepository } from './junction-box-survey.repository';
import { domainJunctionBoxSurvey, createJunctionBoxSurveyInput, updateJunctionBoxSurveyInput } from './__stubs__';
import { JunctionBoxSurveyNotFoundException } from './exceptions/junction-box-survey-not-found.exception';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	spanJunctionBoxesSurveys: {
		create: jest.fn().mockResolvedValue(domainJunctionBoxSurvey),
		findFirst: jest.fn().mockResolvedValue(domainJunctionBoxSurvey),
		update: jest.fn().mockResolvedValue(domainJunctionBoxSurvey),
	},
	...(<any>{}),
};

let repository: JunctionBoxSurveyRepository;

const surveyId = '82580f03-5fe9-4554-aa85-6c0fe28a693d';
const junctionBoxId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('Span Installation Survey / JunctionBox / Repository', () => {
	beforeEach(() => {
		repository = new JunctionBoxSurveyRepository(prismaServiceMock);
	});

	describe('getJunctionBoxSurvey()', () => {
		test('returns mast survey', async () => {
			const survey = await repository.getJunctionBoxSurvey(surveyId, junctionBoxId);
			expect(prismaServiceMock.spanJunctionBoxesSurveys.findFirst).toHaveBeenCalledWith({
				where: { surveyId, junctionBoxId },
			});
			expect(survey).toEqual(domainJunctionBoxSurvey);
		});

		test('throws an exception when not found', async () => {
			prismaServiceMock.spanJunctionBoxesSurveys.findFirst.mockResolvedValueOnce(null);
			await expect(repository.getJunctionBoxSurvey(surveyId, junctionBoxId)).rejects.toThrow(
				JunctionBoxSurveyNotFoundException,
			);
		});
	});

	test('createJunctionBoxSurvey()', async () => {
		const returnValue = await repository.createJunctionBoxSurvey(createJunctionBoxSurveyInput);
		const survey = prismaServiceMock.spanJunctionBoxesSurveys.create.mock.calls[0][0].data;
		expect(survey).toEqual(
			expect.objectContaining({
				cableDamage: true,
				faultyMontageTensionWire: true,
				faultyMontageFacade: true,
				junctionBoxDamage: true,
				stickerNotReadable: true,
				remarks: '__REMARKS__',
				spanJunctionBoxes: {
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
				...createJunctionBoxSurveyInput,
			}),
		);
	});

	test('updateJunctionBoxSurvey()', async () => {
		prismaServiceMock.spanJunctionBoxesSurveys.update.mockResolvedValue(domainJunctionBoxSurvey);
		const returnValue = await repository.updateJunctionBoxSurvey(updateJunctionBoxSurveyInput);
		expect(prismaServiceMock.spanJunctionBoxesSurveys.update).toHaveBeenCalledWith({
			where: { id: updateJunctionBoxSurveyInput.id },
			data: {
				remarks: '__REMARKS__',
				cableDamage: true,
				faultyMontageTensionWire: true,
				faultyMontageFacade: true,
				junctionBoxDamage: true,
				stickerNotReadable: true,
			},
		});
		expect(returnValue).toEqual({
			cableDamage: true,
			faultyMontageFacade: true,
			faultyMontageTensionWire: true,
			id: '796229bf-1b54-4bb7-a7d4-acb0dc3062df',
			junctionBoxDamage: true,
			junctionBoxId: '83ca470b-768a-49a7-a59f-4fe5da5620cf',
			remarks: '__REMARKS__',
			stickerNotReadable: true,
			surveyId: '9003d096-4dd2-4d0d-b74b-9406a721d94d',
		});
	});
});
