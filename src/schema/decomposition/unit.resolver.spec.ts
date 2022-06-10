import { MockedObjectDeep } from 'ts-jest';
import { CommandBus } from '@nestjs/cqrs';

import { UnitResolver } from './unit.resolver';
import { UnitService } from './unit.service';
import { unitInput, domainUnit, deletedUnit, updateUnitInput } from './__stubs__';
import { CreateUnitCommand } from './commands/create-unit.command';
import { Unit } from './models/unit.model';
import { UpdateElementCommand } from './commands/update-element.command';
import { UpdateUnitCommand } from './commands/update-unit.command';
import { DeleteUnitCommand } from './commands/delete-unit.command';

jest.mock('./unit.service');

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

describe('Decomposition / Unit / Resolver', () => {
	describe('createUnit', () => {
		test('creates and returns a unit', async () => {
			const commandBusMock = getCommandBusMock();
			const resolver = new UnitResolver(new UnitService(), commandBusMock);
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
			const resolver = new UnitResolver(new UnitService(), commandBusMock);
			const result = await resolver.updateUnit(updateUnitInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new UpdateElementCommand(updateUnitInput));

			expect(result).toBeInstanceOf(Unit);
			expect(result.id).toBe(updateUnitInput.id);
		});
	});

	describe('deleteUnit', () => {
		test('soft-deletes and returns a unit', async () => {
			const commandBusMock = getCommandBusMock();
			const resolver = new UnitResolver(new UnitService(), commandBusMock);
			const result = await resolver.deleteElement(domainUnit.id);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new DeleteUnitCommand(domainUnit.id));

			expect(result).toBeInstanceOf(Unit);
			expect(result.id).toBe(domainUnit.id);
			expect(result.deletedAt).toBe('Thu, 09 Jun 2022 15:03:22 GMT');
		});
	});
});
