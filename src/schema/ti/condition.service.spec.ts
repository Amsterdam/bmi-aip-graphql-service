import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { ConditionService } from './condition.service';
import { ConditionRepository } from './condition.repository';
import { domainCondition } from './__stubs__';
import { ConditionFactory } from './condition.factory';
import { Condition } from './models/condition.model';

jest.mock('./condition.repository');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const repo = new ConditionRepository(prismaServiceMock);

describe('Conditions / Service', () => {
	test('getCondition returns Condition by surveyId', async () => {
		const service = new ConditionService(repo);
		const conditions = await service.getConditions('68a95a2c-b909-e77f-4d66-9fd5afef52db');
		expect(conditions).toBeInstanceOf(Array);
		expect(conditions[0]).toBeInstanceOf(Condition);
		expect(conditions).toEqual([domainCondition].map((condition) => ConditionFactory.CreateCondition(condition)));
	});
});
