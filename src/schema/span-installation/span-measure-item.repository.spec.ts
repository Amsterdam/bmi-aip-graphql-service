import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { SpanMeasureItemRepository } from './span-measure-item.repository';
import { domainSpanMeasureItem, createSpanMeasureItemInput } from './__stubs__/span-measure-item';

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	spanMeasureItems: {
		create: jest.fn().mockResolvedValue(domainSpanMeasureItem),
		findMany: jest.fn().mockResolvedValue([domainSpanMeasureItem]),
		update: jest.fn().mockResolvedValue(domainSpanMeasureItem),
	},
	$executeRaw: jest.fn(),
	$queryRaw: jest.fn(),
	...(<any>{}),
};

let repository: SpanMeasureItemRepository;

describe('Span Installation / Measures / Repository', () => {
	beforeEach(() => {
		repository = new SpanMeasureItemRepository(prismaServiceMock);
	});

	test('createSpanMeasureItem()', async () => {
		const returnValue = await repository.createSpanMeasureItem(domainSpanMeasureItem);
		const spanMeasureItem = prismaServiceMock.spanMeasureItems.create.mock.calls[0][0].data;
		expect(spanMeasureItem).toEqual(
			expect.objectContaining({
				id: spanMeasureItem.id,
				itemType: 'material',
				description: '__NAME__',
				spanMeasures: {
					connect: {
						id: '1f728e79-1b89-4333-a309-ea93bf17667c',
					},
				},
				quantityActual: 1,
				quantityEstimate: 1,
				quantityUnitOfMeasurement: '1f728e79-1b89-4333-a309-ea93bf17667c',
			}),
		);

		expect(returnValue).toEqual(
			expect.objectContaining({
				...createSpanMeasureItemInput,
			}),
		);
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
