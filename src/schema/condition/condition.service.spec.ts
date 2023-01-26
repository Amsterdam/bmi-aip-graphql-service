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
	test('findConditions returns array of Condition survey', async () => {
		const service = new ConditionService(repo);
		const conditions = await service.findConditions('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(conditions).toBeInstanceOf(Array);
		expect(conditions[0]).toBeInstanceOf(Condition);
		expect(conditions).toEqual([domainCondition].map((condition) => ConditionFactory.CreateCondition(condition)));
	});
});
