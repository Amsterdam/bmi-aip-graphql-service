import { Prisma } from '@prisma/client';
import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { ConditionRepository } from './condition.repository';
import { domainCondition, conditionInput, updateConditionInput } from './__stubs__';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	conditions: {
		create: jest.fn().mockResolvedValue(domainCondition),
		findMany: jest.fn().mockResolvedValue([domainCondition]),
		update: jest.fn().mockResolvedValue(domainCondition),
		findUnique: jest.fn().mockResolvedValue(domainCondition),
	},
	...(<any>{}),
};

const repo = new ConditionRepository(prismaServiceMock);

describe('ConditionRepository', () => {
	test('createCondition()', async () => {
		await repo.createCondition(conditionInput);
		const condition = prismaServiceMock.conditions.create.mock.calls[0][0].data;
		expect(prismaServiceMock.conditions.create).toHaveBeenCalledWith({
			data: expect.objectContaining({
				id: condition.id,
				surveys: {
					connect: {
						id: '68a95a2c-b909-e77f-4d66-9fd5afef5adb',
					},
				},
				costYear: 2010,
				score: '7.3',
				careScore: '33.99',
				advice: '__ADVICE__',
				cost: 0,
				investigationPriority: '',
				craInspectionRemarks: '',
				craInitialScore: 0,
				craHistoryScore: 0,
				craInspectionScore: 0,
				craInitialRemarks: '',
				craHistoryRemarks: '',
				craInitialUnityCheck: new Prisma.Decimal(10.2),
				craHistoryUnityCheck: new Prisma.Decimal(10.2),
				ramsMaxTotalPriority: '',
				ramsMaxWeightedPriority: '',
				isFurtherInvestigation: false,
			}),
		});
	});

	test('getCondition()', async () => {
		const condition = await repo.getCondition('__CONDITION_ID__');
		expect(prismaServiceMock.conditions.findUnique).toHaveBeenCalledWith({
			where: { id: '__CONDITION_ID__' },
		});
		expect(condition).toEqual(domainCondition);
	});

	test('getConditions()', async () => {
		const conditions = await repo.getConditions('__SURVEY_ID__');
		expect(prismaServiceMock.conditions.findMany).toHaveBeenCalledWith({
			where: { surveyId: '__SURVEY_ID__' },
		});
		expect(conditions).toEqual([domainCondition]);
	});

	test('updateCondition()', async () => {
		await repo.updateCondition(updateConditionInput);
		expect(prismaServiceMock.conditions.update).toHaveBeenCalledWith({
			where: { id: updateConditionInput.id },
			data: expect.objectContaining({
				costYear: 2010,
				score: '7.3',
				careScore: '33.99',
				advice: '__ADVICE__',
			}),
		});
	});
});
