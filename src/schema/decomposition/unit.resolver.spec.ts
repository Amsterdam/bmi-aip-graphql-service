import { MockedObjectDeep } from 'ts-jest';
import { CommandBus } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';

import { UnitResolver } from './unit.resolver';
import { UnitService } from './unit.service';
import { unitInput, domainUnit } from './__stubs__';
import { CreateUnitCommand } from './commands/create-unit.command';
import { Unit } from './models/unit.model';
import { UnitRepository } from './unit.repository';

jest.mock('./unit.repository');

const commandBusMock: MockedObjectDeep<CommandBus> = {
	execute: jest.fn((command: any) => {
		switch (command.constructor.name) {
			case CreateUnitCommand.name:
				return domainUnit;
		}
	}),
	...(<any>{}),
};

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

describe('Decomposition / Unit / Resolver', () => {
	describe('createUnit', () => {
		test('creates and returns a unit', async () => {
			const resolver = new UnitResolver(new UnitService(new UnitRepository(prismaServiceMock)), commandBusMock);
			const result = await resolver.createUnit(unitInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new CreateUnitCommand(unitInput));

			expect(result).toBeInstanceOf(Unit);
			expect(typeof result.id).toBe('string');
		});
	});
});
