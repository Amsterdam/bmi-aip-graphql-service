import { MockedObjectDeep } from 'ts-jest';
import { Decimal } from '@prisma/client/runtime';

import { PrismaService } from '../../prisma.service';

import { ConditionRepository } from './condition.repository';
import { domainCondition, conditionInput, updateConditionInput } from './__stubs__';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	conditions: {
		create: jest.fn().mockResolvedValue(domainCondition),
		findFirst: jest.fn().mockResolvedValue(domainCondition),
		update: jest.fn().mockResolvedValue(domainCondition),
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
				craInitialUnityCheck: new Decimal(10.2),
				craHistoryUnityCheck: new Decimal(10.2),
				ramsMaxTotalPriority: '',
				ramsMaxWeightedPriority: '',
				isFurtherInvestigation: false,
			}),
		});
	});

	test('getCondition()', async () => {
		expect(await repo.getCondition(domainCondition.surveyId)).toEqual(domainCondition);
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
