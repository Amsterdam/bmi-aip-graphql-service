import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { SpanMeasureItemRepository } from './span-measure-item.repository';
import { domainSpanMeasure } from './__stubs__';
import {
	domainSpanMeasureItem,
	createSpanMeasureItemInput,
	saveSpanMeasureItemInput,
} from './__stubs__/span-measure-item';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	spanMeasureItems: {
		create: jest.fn().mockResolvedValue(domainSpanMeasureItem),
		createMany: jest.fn().mockResolvedValue([domainSpanMeasureItem]),
		findMany: jest.fn().mockResolvedValue([domainSpanMeasureItem]),
		findFirst: jest.fn().mockResolvedValue([domainSpanMeasureItem]),
		deleteMany: jest.fn().mockResolvedValue([]),
		update: jest.fn().mockResolvedValue(domainSpanMeasureItem),
	},
	$executeRaw: jest.fn(),
	$queryRaw: jest.fn(),
	...(<any>{}),
	spanMeasures: {
		delete: jest.fn().mockResolvedValue(domainSpanMeasure),
	},
};

let repository: SpanMeasureItemRepository;

describe('Span Installation / Measures / Repository', () => {
	beforeEach(() => {
		repository = new SpanMeasureItemRepository(prismaServiceMock);
	});

	test('createSpanMeasureItem()', async () => {
		const returnValue = await repository.createSpanMeasureItem(createSpanMeasureItemInput);
		const spanMeasureItem = prismaServiceMock.spanMeasureItems.create.mock.calls[0][0].data;
		expect(spanMeasureItem).toEqual(
			expect.objectContaining({
				id: spanMeasureItem.id,
				isActive: true,
				itemType: 'material',
				description: '__NAME__',
				spanMeasures: {
					connect: {
						id: '1f728e79-1b89-4333-a309-ea93bf17667c',
					},
				},
				quantityEstimate: 1,
				quantityUnitOfMeasurement: '1f728e79-1b89-4333-a309-ea93bf17667c',
				optionId: '1f728e79-1b89-4333-a309-ea93bf17667c',
			}),
		);

		expect(returnValue).toEqual(
			expect.objectContaining({
				...domainSpanMeasureItem,
			}),
		);
	});

	test('saveSpanMeasureItem() with span measure items', async () => {
		const returnValue = await repository.saveSpanMeasureItems(saveSpanMeasureItemInput);
		const spanMeasureItem = prismaServiceMock.spanMeasureItems.create.mock.calls[0][0].data;
		expect(spanMeasureItem).toEqual(
			expect.objectContaining({
				id: spanMeasureItem.id,
				isActive: true,
				itemType: 'material',
				description: '__NAME__',
				spanMeasures: {
					connect: {
						id: '1f728e79-1b89-4333-a309-ea93bf17667c',
					},
				},
				quantityEstimate: 1,
				quantityUnitOfMeasurement: '1f728e79-1b89-4333-a309-ea93bf17667c',
				optionId: '1f728e79-1b89-4333-a309-ea93bf17667c',
			}),
		);

		expect(returnValue).toEqual(
			expect.objectContaining([
				{
					...domainSpanMeasureItem,
				},
			]),
		);
	});

	test('saveSpanMeasureItem() with no span measure items', async () => {
		const returnValue = await repository.saveSpanMeasureItems({
			spanMeasureId: '1f728e79-1b89-4333-a309-ea93bf17667c',
			spanMeasureItems: [],
		});
		const spanMeasure = prismaServiceMock.spanMeasures.delete.mock.calls[0][0].data;
		expect(spanMeasure).toEqual(expect.objectContaining({}));

		expect(returnValue).toEqual(expect.objectContaining([]));
	});

	test('findSpanMeasureItems()', async () => {
		const expected = {
			...domainSpanMeasureItem,
		};
		const spanMeasureItems = await repository.findSpanMeasureItems('__SPAN_MEASURE_ID__');
		expect(prismaServiceMock.spanMeasureItems.findMany).toHaveBeenCalledWith({
			where: { spanMeasureId: '__SPAN_MEASURE_ID__' },
		});
		expect(spanMeasureItems).toEqual([expected]);
	});
});
