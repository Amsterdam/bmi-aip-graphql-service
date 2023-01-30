import { MockedObjectDeep } from 'ts-jest';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';

import { MeasureResolver } from './measure.resolver';
import { MeasureService } from './measure.service';
import { MeasureRepository } from './measure.repository';
import { domainMeasure, measure1, measure2, measureInput, updateMeasureInput, deletedMeasure } from './__stubs__';
import { CreateMeasureCommand } from './commands/create-measure.command';
import { Measure } from './models/measure.model';
import { UpdateMeasureCommand } from './commands/update-measure.command';
import { DeleteMeasureCommand } from './commands/delete-measure.command';

jest.mock('./measure.service');
jest.mock('./measure.repository');

const getQueryBusMock = (): MockedObjectDeep<QueryBus> => ({
	execute: jest.fn((query: any) => {
		return;
	}),
	...(<any>{}),
});
const queryBusMock = getQueryBusMock();

const getCommandBusMock = (): MockedObjectDeep<CommandBus> => ({
	execute: jest.fn((command: any) => {
		switch (command.constructor.name) {
			case CreateMeasureCommand.name:
			case UpdateMeasureCommand.name:
				return domainMeasure;
			case DeleteMeasureCommand.name:
				return deletedMeasure;
		}
	}),
	...(<any>{}),
});

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const measureRepo = new MeasureRepository(prismaServiceMock);

describe('Decomposition / Measure / Resolver', () => {
	describe('createMeasure', () => {
		test('creates and returns an measure', async () => {
			const commandBusMock = getCommandBusMock();
			const resolver = new MeasureResolver(new MeasureService(measureRepo), commandBusMock, queryBusMock);
			const result = await resolver.createMeasure(measureInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new CreateMeasureCommand(measureInput));

			expect(result).toBeInstanceOf(Measure);
			expect(typeof result.id).toBe('string');
		});
	});

	describe('updateMeasure', () => {
		test('updates and returns an measure', async () => {
			const commandBusMock = getCommandBusMock();
			const resolver = new MeasureResolver(new MeasureService(measureRepo), commandBusMock, queryBusMock);
			const result = await resolver.updateMeasure(updateMeasureInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new UpdateMeasureCommand(updateMeasureInput));

			expect(result).toBeInstanceOf(Measure);
			expect(result.id).toBe(updateMeasureInput.id);
		});
	});

	describe('deleteMeasure', () => {
		test('soft-deletes and returns an measure', async () => {
			const commandBusMock = getCommandBusMock();
			const resolver = new MeasureResolver(new MeasureService(measureRepo), commandBusMock, queryBusMock);
			const result = await resolver.deleteMeasure(domainMeasure.id);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new DeleteMeasureCommand(domainMeasure.id));

			expect(result).toBeInstanceOf(Measure);
			expect(result.id).toBe(domainMeasure.id);
			expect(result.deletedAt).toBe('Thu, 09 Jun 2022 15:03:22 GMT');
		});
	});

	test('getSurveyMeasures returns an array of measure objects', async () => {
		const commandBusMock = getCommandBusMock();
		const resolver = new MeasureResolver(new MeasureService(measureRepo), commandBusMock, queryBusMock);
		const measures = await resolver.getSurveyMeasures('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(measures).toEqual([measure1, measure2]);
	});
});
