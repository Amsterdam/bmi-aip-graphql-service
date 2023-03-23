import { MockedObjectDeep } from 'ts-jest';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';
import { MeasureService } from '../measure/measure.service';
import { MeasureRepository } from '../measure/measure.repository';
import { CyclicMeasureService } from '../measure/cyclic-measure.service';
import { CyclicMeasureRepository } from '../measure/cyclic-measure.repository';

import { UnitResolver } from './unit.resolver';
import { UnitService } from './unit.service';
import { unitInput, domainUnit, deletedUnit, updateUnitInput } from './__stubs__';
import { CreateUnitCommand } from './commands/create-unit.command';
import { Unit } from './models/unit.model';
import { UnitRepository } from './unit.repository';
import { UpdateUnitCommand } from './commands/update-unit.command';
import { DeleteUnitCommand } from './commands/delete-unit.command';
import { UnitFactory } from './unit.factory';
import { GetUnitByIdQuery } from './queries/get-unit-by-id.query';

jest.mock('./unit.service');
jest.mock('./unit.repository');

jest.mock('../measure/measure.service');
jest.mock('../measure/measure.repository');
jest.mock('../measure/cyclic-measure.service');
jest.mock('../measure/cyclic-measure.repository');

const getCommandBusMock = (): MockedObjectDeep<CommandBus> => ({
	execute: jest.fn((command: any) => {
		switch (command.constructor.name) {
			case CreateUnitCommand.name:
			case UpdateUnitCommand.name:
				return UnitFactory.CreateUnit(domainUnit);
			case DeleteUnitCommand.name:
				return UnitFactory.CreateUnit(deletedUnit);
		}
	}),
	...(<any>{}),
});

const getQueryBusMock = (): MockedObjectDeep<QueryBus> => ({
	execute: jest.fn((query: any) => {
		switch (query.constructor.name) {
			case GetUnitByIdQuery.name:
				return domainUnit;
		}
	}),
	...(<any>{}),
});

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const unitRepo = new UnitRepository(prismaServiceMock);
const unitService = new UnitService(
	unitRepo,
	new MeasureService(new MeasureRepository(prismaServiceMock)),
	new CyclicMeasureService(new CyclicMeasureRepository(prismaServiceMock)),
);

describe('Decomposition / Unit / Resolver', () => {
	describe('createUnit', () => {
		test('creates and returns a unit', async () => {
			const commandBusMock = getCommandBusMock();
			const queryBusMock = getQueryBusMock();
			const resolver = new UnitResolver(unitService, commandBusMock, queryBusMock);
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
			const queryBusMock = getQueryBusMock();
			const resolver = new UnitResolver(unitService, commandBusMock, queryBusMock);
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
			const queryBusMock = getQueryBusMock();
			const resolver = new UnitResolver(unitService, commandBusMock, queryBusMock);
			const result = await resolver.deleteUnit(domainUnit.id);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new DeleteUnitCommand(domainUnit.id));

			expect(result).toBeInstanceOf(Unit);
			expect(result.id).toBe(domainUnit.id);
			expect(result.deletedAt).toBe('Thu, 09 Jun 2022 15:03:22 GMT');
		});
	});
});
