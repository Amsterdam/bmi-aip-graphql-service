import { MockedObjectDeep } from 'ts-jest';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';

import { CyclicMeasureResolver } from './cyclic-measure.resolver';
import { CyclicMeasureService } from './cyclic-measure.service';
import { CyclicMeasureRepository } from './cyclic-measure.repository';
import {
	domainCyclicMeasure,
	cyclicMeasure1,
	cyclicMeasure2,
	cyclicMeasureInput,
	updateCyclicMeasureInput,
	deletedCyclicMeasure,
} from './__stubs__';
import { CreateCyclicMeasureCommand } from './commands/create-cyclic-measure.command';
import { CyclicMeasure } from './models/cyclic-measure.model';
import { UpdateCyclicMeasureCommand } from './commands/update-cyclic-measure.command';
import { DeleteCyclicMeasureCommand } from './commands/delete-cyclic-measure.command';
import { FindCyclicMeasuresQuery } from './queries/find-cyclic-measures.query';
import { DefaultMaintenanceMeasureService } from './../default-maintenance-measure/default-maintenance-measure.service';

jest.mock('./cyclic-measure.service');
jest.mock('./cyclic-measure.repository');

const getCommandBusMock = (): MockedObjectDeep<CommandBus> => ({
	execute: jest.fn((command: any) => {
		switch (command.constructor.name) {
			case CreateCyclicMeasureCommand.name:
			case UpdateCyclicMeasureCommand.name:
				return domainCyclicMeasure;
			case DeleteCyclicMeasureCommand.name:
				return deletedCyclicMeasure;
		}
	}),
	...(<any>{}),
});

const getQueryBusMock = (): MockedObjectDeep<QueryBus> => ({
	execute: jest.fn((command: any) => {
		switch (command.constructor.name) {
			case FindCyclicMeasuresQuery.name:
				return [cyclicMeasure1, cyclicMeasure2];
		}
	}),
	...(<any>{}),
});

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const defaultMaintenanceMeasureServiceMock: MockedObjectDeep<DefaultMaintenanceMeasureService> = {
	...(<any>{}),
};

const cyclicMeasureRepo = new CyclicMeasureRepository(prismaServiceMock, defaultMaintenanceMeasureServiceMock);

describe('Decomposition / CyclicMeasure / Resolver', () => {
	describe('createCyclicMeasure', () => {
		test('creates and returns an cyclicMeasure', async () => {
			const commandBusMock = getCommandBusMock();
			const resolver = new CyclicMeasureResolver(
				new CyclicMeasureService(cyclicMeasureRepo),
				commandBusMock,
				getQueryBusMock(),
			);
			const result = await resolver.createCyclicMeasure(cyclicMeasureInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new CreateCyclicMeasureCommand(cyclicMeasureInput));

			expect(result).toBeInstanceOf(CyclicMeasure);
			expect(typeof result.id).toBe('string');
		});
	});

	describe('updateCyclicMeasure', () => {
		test('updates and returns an cyclicMeasure', async () => {
			const commandBusMock = getCommandBusMock();
			const resolver = new CyclicMeasureResolver(
				new CyclicMeasureService(cyclicMeasureRepo),
				commandBusMock,
				getQueryBusMock(),
			);
			const result = await resolver.updateCyclicMeasure(updateCyclicMeasureInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(
				new UpdateCyclicMeasureCommand(updateCyclicMeasureInput),
			);

			expect(result).toBeInstanceOf(CyclicMeasure);
			expect(result.id).toBe(updateCyclicMeasureInput.id);
		});
	});

	describe('deleteCyclicMeasure', () => {
		test('soft-deletes and returns an cyclicMeasure', async () => {
			const commandBusMock = getCommandBusMock();
			const resolver = new CyclicMeasureResolver(
				new CyclicMeasureService(cyclicMeasureRepo),
				commandBusMock,
				getQueryBusMock(),
			);
			const result = await resolver.deleteCyclicMeasure(domainCyclicMeasure.id);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new DeleteCyclicMeasureCommand(domainCyclicMeasure.id));

			expect(result).toBeInstanceOf(CyclicMeasure);
			expect(result.id).toBe(domainCyclicMeasure.id);
			expect(result.deletedAt).toBe('Thu, 09 Jun 2022 15:03:22 GMT');
		});
	});

	test('getSurveyCyclicMeasures returns an array of cyclicMeasure objects', async () => {
		const commandBusMock = getCommandBusMock();
		const resolver = new CyclicMeasureResolver(
			new CyclicMeasureService(cyclicMeasureRepo),
			commandBusMock,
			getQueryBusMock(),
		);
		const cyclicMeasures = await resolver.getSurveyCyclicMeasures('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(cyclicMeasures).toEqual([cyclicMeasure1, cyclicMeasure2]);
	});
});
