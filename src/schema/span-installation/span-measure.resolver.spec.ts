import { MockedObjectDeep } from 'ts-jest';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';

import { FindSpanMeasuresQuery } from './queries/find-span-measures.query';
import { domainSpanMeasure, createSpanMeasureInput, updateSpanMeasureInput } from './__stubs__';
import { SpanMeasureResolver } from './span-measure.resolver';
import { SpanMeasureService } from './span-measure.service';
import { SpanMeasureRepository } from './span-measure.repository';
import { CreateSpanMeasureCommand } from './commands/create-span-measure.command';
import { UpdateSpanMeasureCommand } from './commands/update-span-measure.command';
import { DeleteSpanMeasureCommand } from './commands/delete-span-measure.command';
import { SpanMeasure } from './models/span-measure.model';

jest.mock('./span-measure.service');
jest.mock('./span-measure.repository');

const getCommandBusMock = (): MockedObjectDeep<CommandBus> => ({
	execute: jest.fn((command: any) => {
		switch (command.constructor.name) {
			case CreateSpanMeasureCommand.name:
			case UpdateSpanMeasureCommand.name:
				return domainSpanMeasure;
			case DeleteSpanMeasureCommand.name:
				return domainSpanMeasure;
		}
	}),
	...(<any>{}),
});

const getQueryBusMock = (): MockedObjectDeep<QueryBus> => ({
	execute: jest.fn((query: any) => {
		switch (query.constructor.name) {
			case FindSpanMeasuresQuery.name:
				return [domainSpanMeasure, domainSpanMeasure];
		}
	}),
	...(<any>{}),
});

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const spanMeasureRepo = new SpanMeasureRepository(prismaServiceMock);

describe('createSpanMeasure', () => {
	test('creates and returns an element', async () => {
		const commandBusMock = getCommandBusMock();
		const queryBusMock = getQueryBusMock();
		const resolver = new SpanMeasureResolver(new SpanMeasureService(spanMeasureRepo), commandBusMock, queryBusMock);
		const result = await resolver.createSpanMeasure(createSpanMeasureInput);
		expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
		expect(commandBusMock.execute).toHaveBeenCalledWith(new CreateSpanMeasureCommand(createSpanMeasureInput));

		expect(result).toBeInstanceOf(SpanMeasure);
		expect(typeof result.id).toBe('string');
	});
});

describe('updateSpanMeasure', () => {
	test('updates and returns a support system', async () => {
		const commandBusMock = getCommandBusMock();
		const queryBusMock = getQueryBusMock();
		const resolver = new SpanMeasureResolver(new SpanMeasureService(spanMeasureRepo), commandBusMock, queryBusMock);
		const result = await resolver.updateSpanMeasure(updateSpanMeasureInput);
		expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
		expect(commandBusMock.execute).toHaveBeenCalledWith(new UpdateSpanMeasureCommand(updateSpanMeasureInput));

		expect(result).toBeInstanceOf(SpanMeasure);
		expect(result.id).toBe(updateSpanMeasureInput.id);
	});
});

describe('Span Installation / Measure / Resolver', () => {
	test('findSpanMeasures returns an array of span measure objects', async () => {
		const commandBusMock = getCommandBusMock();
		const queryBusMock = getQueryBusMock();
		const resolver = new SpanMeasureResolver(new SpanMeasureService(spanMeasureRepo), commandBusMock, queryBusMock);
		const elements = await resolver.spanMeasures('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(elements).toEqual([domainSpanMeasure, domainSpanMeasure]);
	});
});
