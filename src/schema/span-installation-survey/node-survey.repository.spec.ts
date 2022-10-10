import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { SupportSystemSurveyNotFoundException } from './exceptions/support-system-survey-not-found.exception';
import { NodeSurveyRepository } from './node-survey.repository';
import { domainNodeSurvey, createNodeSurveyInput, updateNodeSurveyInput } from './__stubs__';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	spanSupportSystemNodeSurveys: {
		create: jest.fn().mockResolvedValue(domainNodeSurvey),
		findFirst: jest.fn().mockResolvedValue(domainNodeSurvey),
		update: jest.fn().mockResolvedValue(domainNodeSurvey),
	},
	...(<any>{}),
};

let repository: NodeSurveyRepository;

const surveyId = '82580f03-5fe9-4554-aa85-6c0fe28a693d';
const supportSystemId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('Span Installation Survey / Node / Repository', () => {
	beforeEach(() => {
		repository = new NodeSurveyRepository(prismaServiceMock);
	});

	describe('getNodeSurvey()', () => {
		test('returns node survey', async () => {
			const survey = await repository.getNodeSurvey(surveyId, supportSystemId);
			expect(prismaServiceMock.spanSupportSystemNodeSurveys.findFirst).toHaveBeenCalledWith({
				where: { surveyId, supportSystemId },
			});
			expect(survey).toEqual(domainNodeSurvey);
		});

		test('throws an exception when not found', async () => {
			prismaServiceMock.spanSupportSystemNodeSurveys.findFirst.mockResolvedValueOnce(null);
			await expect(repository.getNodeSurvey(surveyId, supportSystemId)).rejects.toThrow(
				SupportSystemSurveyNotFoundException,
			);
		});
	});

	test('createNodeSurvey()', async () => {
		const returnValue = await repository.createNodeSurvey(createNodeSurveyInput);
		const survey = prismaServiceMock.spanSupportSystemNodeSurveys.create.mock.calls[0][0].data;
		expect(survey).toEqual(
			expect.objectContaining({
				nodeDamage: true,
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
				...createNodeSurveyInput,
			}),
		);
	});

	test('updateNodeSurvey()', async () => {
		prismaServiceMock.spanSupportSystemNodeSurveys.update.mockResolvedValue(domainNodeSurvey);
		const returnValue = await repository.updateNodeSurvey(updateNodeSurveyInput);
		expect(prismaServiceMock.spanSupportSystemNodeSurveys.update).toHaveBeenCalledWith({
			where: { id: updateNodeSurveyInput.id },
			data: {
				remarks: '__REMARKS__',
				nodeDamage: true,
			},
		});
		expect(returnValue).toEqual({
			id: '796229bf-1b54-4bb7-a7d4-acb0dc3062df',
			nodeDamage: true,
			remarks: '__REMARKS__',
			supportSystemId: '83ca470b-768a-49a7-a59f-4fe5da5620cf',
			surveyId: '9003d096-4dd2-4d0d-b74b-9406a721d94d',
		});
	});
});
