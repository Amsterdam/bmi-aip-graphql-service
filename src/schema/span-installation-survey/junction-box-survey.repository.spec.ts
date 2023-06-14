import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { JunctionBoxSurveyRepository } from './junction-box-survey.repository';
import { domainJunctionBoxSurvey, createJunctionBoxSurveyInput, updateJunctionBoxSurveyInput } from './__stubs__';
import { JunctionBoxSurveyNotFoundException } from './exceptions/junction-box-survey-not-found.exception';

const permanentId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	spanJunctionBoxSurveys: {
		create: jest.fn().mockResolvedValue(domainJunctionBoxSurvey),
		findFirst: jest.fn().mockResolvedValue(domainJunctionBoxSurvey),
		update: jest.fn().mockResolvedValue(domainJunctionBoxSurvey),
	},
	spanJunctionBoxes: {
		findUnique: jest.fn().mockResolvedValue({ permanentId }),
	},
	...(<any>{}),
};

let repository: JunctionBoxSurveyRepository;

const junctionBoxId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('Span Installation Survey / JunctionBox / Repository', () => {
	beforeEach(() => {
		repository = new JunctionBoxSurveyRepository(prismaServiceMock);
	});

	describe('getJunctionBoxSurvey()', () => {
		test('returns mast survey', async () => {
			const survey = await repository.getJunctionBoxSurvey(junctionBoxId);
			expect(prismaServiceMock.spanJunctionBoxSurveys.findFirst).toHaveBeenCalledWith({
				where: { junctionBoxId },
			});
			expect(survey).toEqual(domainJunctionBoxSurvey);
		});

		test('throws an exception when not found', async () => {
			prismaServiceMock.spanJunctionBoxSurveys.findFirst.mockResolvedValueOnce(null);
			await expect(repository.getJunctionBoxSurvey(junctionBoxId)).rejects.toThrow(
				JunctionBoxSurveyNotFoundException,
			);
		});
	});

	test('createJunctionBoxSurvey()', async () => {
		const returnValue = await repository.createJunctionBoxSurvey(createJunctionBoxSurveyInput);
		const survey = prismaServiceMock.spanJunctionBoxSurveys.create.mock.calls[0][0].data;
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
		prismaServiceMock.spanJunctionBoxSurveys.update.mockResolvedValue(domainJunctionBoxSurvey);
		const returnValue = await repository.updateJunctionBoxSurvey(updateJunctionBoxSurveyInput);
		expect(prismaServiceMock.spanJunctionBoxSurveys.update).toHaveBeenCalledWith({
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
		});
	});

	test('getJunctionBoxSurveyOnPermanentId()', async () => {
		const spy = jest.spyOn(repository, 'getJunctionBoxSurvey');
		await repository.getJunctionBoxSurveyOnPermanentId(domainJunctionBoxSurvey.junctionBoxId);
		expect(spy).toHaveBeenLastCalledWith(permanentId);
	});

	describe('hasDamage', () => {
		test('true', async () => {
			const spy = jest
				.spyOn(repository, 'getJunctionBoxSurveyOnPermanentId')
				.mockResolvedValue(domainJunctionBoxSurvey);
			const returnValue = await repository.hasDamage('3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7');
			expect(spy).toHaveBeenLastCalledWith('3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7');
			expect(returnValue).toEqual(true);
		});

		test('false', async () => {
			const spy = jest.spyOn(repository, 'getJunctionBoxSurveyOnPermanentId').mockResolvedValue({
				...domainJunctionBoxSurvey,
				cableDamage: false,
				faultyMontageFacade: false,
				faultyMontageTensionWire: false,
				junctionBoxDamage: false,
				stickerNotReadable: false,
			});
			const returnValue = await repository.hasDamage('3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7');
			expect(spy).toHaveBeenLastCalledWith('3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7');
			expect(returnValue).toEqual(false);
		});
	});
});
