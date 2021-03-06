import { MockedObjectDeep } from 'ts-jest';
import { CommandBus } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';

import { UnitResolver } from './unit.resolver';
import { UnitService } from './unit.service';
import { unitInput, domainUnit, deletedUnit, updateUnitInput } from './__stubs__';
import { CreateUnitCommand } from './commands/create-unit.command';
import { Unit } from './models/unit.model';
import { UnitRepository } from './unit.repository';
import { UpdateUnitCommand } from './commands/update-unit.command';
import { DeleteUnitCommand } from './commands/delete-unit.command';

jest.mock('./unit.repository');

const getCommandBusMock = (): MockedObjectDeep<CommandBus> => ({
	execute: jest.fn((command: any) => {
		switch (command.constructor.name) {
			case CreateUnitCommand.name:
			case UpdateUnitCommand.name:
				return domainUnit;
			case DeleteUnitCommand.name:
				return deletedUnit;
		}
	}),
	...(<any>{}),
});

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

describe('Decomposition / Unit / Resolver', () => {
	describe('createUnit', () => {
		test('creates and returns a unit', async () => {
			const commandBusMock = getCommandBusMock();
			const resolver = new UnitResolver(new UnitService(new UnitRepository(prismaServiceMock)), commandBusMock);
			const result = await resolver.createUnit(unitInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new CreateUnitCommand(unitInput));

			expect(result).toBeInstanceOf(Unit);
			expect(typeof result.id).toBe('string');
		});
	});

	describe('updateUnit', () => {
		test('updates and returns a unit', async () => {
			const commandBusMock = getCommandBusMock();
			const resolver = new UnitResolver(new UnitService(new UnitRepository(prismaServiceMock)), commandBusMock);
			const result = await resolver.updateUnit(updateUnitInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new UpdateUnitCommand(updateUnitInput));

			expect(result).toBeInstanceOf(Unit);
			expect(result.id).toBe(updateUnitInput.id);
		});
	});

	describe('deleteUnit', () => {
		test('soft-deletes and returns a unit', async () => {
			const commandBusMock = getCommandBusMock();
			const resolver = new UnitResolver(new UnitService(new UnitRepository(prismaServiceMock)), commandBusMock);
			const result = await resolver.deleteUnit(domainUnit.id);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new DeleteUnitCommand(domainUnit.id));

			expect(result).toBeInstanceOf(Unit);
			expect(result.id).toBe(domainUnit.id);
			expect(result.deletedAt).toBe('Thu, 09 Jun 2022 15:03:22 GMT');
		});
	});
});
