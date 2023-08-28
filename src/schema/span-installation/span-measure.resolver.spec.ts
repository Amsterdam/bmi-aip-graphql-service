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
import { SpanMeasureItemService } from './span-measure-item.service';
import { SpanMeasureItemRepository } from './span-measure-item.repository';
import { SpanMeasureStatus } from './types/span-measure-status';
import { FindSpanMeasureItemsQuery } from './queries/find-span-measure-items.query';
import { domainSpanMeasureItem } from './__stubs__/span-measure-item';

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
			case FindSpanMeasureItemsQuery.name:
				return [domainSpanMeasureItem];
		}
	}),
	...(<any>{}),
});

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	findSpanMeasureItems: jest.fn().mockResolvedValue([domainSpanMeasureItem]),
	...(<any>{}),
};

const spanMeasureRepo = new SpanMeasureRepository(prismaServiceMock);
const spanMeasureItemRepo = new SpanMeasureItemRepository(prismaServiceMock);
const spanMeasureItemsServiceMock = new SpanMeasureItemService(spanMeasureItemRepo);

describe('Span Installation / Measure / Resolver', () => {
	beforeAll(() => {
		const commandBusMock = getCommandBusMock();
		const queryBusMock = getQueryBusMock();
		const resolver = new SpanMeasureResolver(
			new SpanMeasureService(spanMeasureRepo, spanMeasureItemsServiceMock),
			commandBusMock,
			queryBusMock,
		);
	});

	test('creates and returns an element', async () => {
		const commandBusMock = getCommandBusMock();
		const queryBusMock = getQueryBusMock();
		const resolver = new SpanMeasureResolver(
			new SpanMeasureService(spanMeasureRepo, spanMeasureItemsServiceMock),
			commandBusMock,
			queryBusMock,
		);
		const result = await resolver.createSpanMeasure(createSpanMeasureInput);
		expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
		expect(commandBusMock.execute).toHaveBeenCalledWith(new CreateSpanMeasureCommand(createSpanMeasureInput));
		expect(typeof result.id).toBe('string');
	});

	test('updates and returns a support system', async () => {
		const commandBusMock = getCommandBusMock();
		const queryBusMock = getQueryBusMock();
		const resolver = new SpanMeasureResolver(
			new SpanMeasureService(spanMeasureRepo, spanMeasureItemsServiceMock),
			commandBusMock,
			queryBusMock,
		);
		const result = await resolver.updateSpanMeasure(updateSpanMeasureInput);
		expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
		expect(commandBusMock.execute).toHaveBeenCalledWith(new UpdateSpanMeasureCommand(updateSpanMeasureInput));
		expect(result.id).toBe(updateSpanMeasureInput.id);
	});

	test('findSpanMeasures returns an array of span measure objects', async () => {
		const commandBusMock = getCommandBusMock();
		const queryBusMock = getQueryBusMock();
		const resolver = new SpanMeasureResolver(
			new SpanMeasureService(spanMeasureRepo, spanMeasureItemsServiceMock),
			commandBusMock,
			queryBusMock,
		);

		const elements = await resolver.spanMeasures('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(elements).toEqual([domainSpanMeasure, domainSpanMeasure]);
	});

	test('returns completed status when all items are completed', async () => {
		const commandBusMock = getCommandBusMock();
		const completeSpanMeasureItem = domainSpanMeasureItem;
		const GetQueryBusMock = (): MockedObjectDeep<QueryBus> => ({
			execute: jest.fn((query: any) => {
				switch (query.constructor.name) {
					case FindSpanMeasuresQuery.name:
						return [domainSpanMeasure, domainSpanMeasure];
					case FindSpanMeasureItemsQuery.name:
						return [completeSpanMeasureItem];
				}
			}),
			...(<any>{}),
		});
		const queryBusMock = GetQueryBusMock();

		const service = new SpanMeasureService(spanMeasureRepo, spanMeasureItemsServiceMock);
		const resolver = new SpanMeasureResolver(service, commandBusMock, queryBusMock);

		const spanMeasureId = '__span_measure_id__';
		const result = await resolver.status({
			id: '__span_measure_id__',
			surveyId: 'survey-1',
			description: 'Dummy span measure',
			optionId: '__option_id__',
			decompositionItemId: '__decomposition_id__',
			decompositionItemType: '',
			measureItems: [],
			created_at: '',
			updated_at: '',
		});

		expect(result).toEqual(SpanMeasureStatus.completed);
		expect(queryBusMock.execute).toHaveBeenCalledWith(new FindSpanMeasureItemsQuery(spanMeasureId));
	});

	test('returns open status when not all items are completed', async () => {
		const commandBusMock = getCommandBusMock();
		const incompleteSpanMeasureItem = domainSpanMeasureItem;
		incompleteSpanMeasureItem.quantityActual = null;
		const GetQueryBusMock = (): MockedObjectDeep<QueryBus> => ({
			execute: jest.fn((query: any) => {
				switch (query.constructor.name) {
					case FindSpanMeasuresQuery.name:
						return [domainSpanMeasure, domainSpanMeasure];
					case FindSpanMeasureItemsQuery.name:
						return [domainSpanMeasureItem, incompleteSpanMeasureItem];
				}
			}),
			...(<any>{}),
		});
		const queryBusMock = GetQueryBusMock();

		const service = new SpanMeasureService(spanMeasureRepo, spanMeasureItemsServiceMock);
		const resolver = new SpanMeasureResolver(service, commandBusMock, queryBusMock);

		const spanMeasureId = '__span_measure_id__';
		const result = await resolver.status({
			id: '__span_measure_id__',
			surveyId: 'survey-1',
			description: 'Dummy span measure',
			optionId: '__option_id__',
			decompositionItemId: '__decomposition_id__',
			decompositionItemType: '',
			measureItems: [],
			created_at: '',
			updated_at: '',
		});

		expect(result).toEqual(SpanMeasureStatus.open);
		expect(queryBusMock.execute).toHaveBeenCalledWith(new FindSpanMeasureItemsQuery(spanMeasureId));
	});

	test('returns open status when no items are found', async () => {
		const commandBusMock = getCommandBusMock();
		const incompleteSpanMeasureItem = domainSpanMeasureItem;
		incompleteSpanMeasureItem.quantityActual = null;
		incompleteSpanMeasureItem.quantityEstimate = null;
		const GetQueryBusMock = (): MockedObjectDeep<QueryBus> => ({
			execute: jest.fn((query: any) => {
				switch (query.constructor.name) {
					case FindSpanMeasuresQuery.name:
						return [domainSpanMeasure, domainSpanMeasure];
					case FindSpanMeasureItemsQuery.name:
						return [];
				}
			}),
			...(<any>{}),
		});
		const queryBusMock = GetQueryBusMock();

		const service = new SpanMeasureService(spanMeasureRepo, spanMeasureItemsServiceMock);
		const resolver = new SpanMeasureResolver(service, commandBusMock, queryBusMock);

		const spanMeasureId = '__span_measure_id__';
		const result = await resolver.status({
			id: '__span_measure_id__',
			surveyId: 'survey-1',
			description: 'Dummy span measure',
			optionId: '__option_id__',
			decompositionItemId: '__decomposition_id__',
			decompositionItemType: '',
			measureItems: [],
			created_at: '',
			updated_at: '',
		});

		expect(result).toEqual(SpanMeasureStatus.open);
		expect(queryBusMock.execute).toHaveBeenCalledWith(new FindSpanMeasureItemsQuery(spanMeasureId));
	});
});
