import { MockedObjectDeep } from 'ts-jest';
import { CommandBus } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';

import { ConditionResolver } from './condition.resolver';
import { ConditionService } from './condition.service';
import { ConditionRepository } from './condition.repository';
import { domainCondition, conditionInput, updateConditionInput, condition1, condition2 } from './__stubs__';
import { CreateConditionCommand } from './commands/create-condition.command';
import { Condition } from './models/condition.model';
import { UpdateConditionCommand } from './commands/update-condition.command';

jest.mock('./condition.service');
jest.mock('./condition.repository');

const getCommandBusMock = (): MockedObjectDeep<CommandBus> => ({
	execute: jest.fn((command: any) => {
		switch (command.constructor.name) {
			case CreateConditionCommand.name:
			case UpdateConditionCommand.name:
				return domainCondition;
		}
	}),
	...(<any>{}),
});

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const conditionRepo = new ConditionRepository(prismaServiceMock);

describe('Decomposition / Condition / Resolver', () => {
	describe('createCondition', () => {
		test('creates and returns a condition', async () => {
			const commandBusMock = getCommandBusMock();
			const resolver = new ConditionResolver(new ConditionService(conditionRepo), commandBusMock);
			const result = await resolver.createCondition(conditionInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new CreateConditionCommand(conditionInput));

			expect(result).toBeInstanceOf(Condition);
			expect(typeof result.id).toBe('string');
		});
	});

	describe('updateCondition', () => {
		test('updates and returns a condition', async () => {
			const commandBusMock = getCommandBusMock();
			const resolver = new ConditionResolver(new ConditionService(conditionRepo), commandBusMock);
			const result = await resolver.updateCondition(updateConditionInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new UpdateConditionCommand(updateConditionInput));

			expect(result).toBeInstanceOf(Condition);
			expect(result.id).toBe(updateConditionInput.id);
		});
	});

	test('getConditions returns an array of Condition objects', async () => {
		const commandBusMock = getCommandBusMock();
		const resolver = new ConditionResolver(new ConditionService(conditionRepo), commandBusMock);
		const conditions = await resolver.getConditions('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(conditions).toEqual([condition1, condition2]);
	});
});
