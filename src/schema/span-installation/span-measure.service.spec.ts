import { MockedObjectDeep } from 'ts-jest';

import { SpanMeasure } from './models/span-measure.model';
import { SpanMeasureFactory } from './span-measure.factory';
import { SpanMeasureRepository } from './span-measure.repository';
import { SpanMeasureService } from './span-measure.service';
import { domainSpanMeasure } from './__stubs__/span-measure';
import { SpanMeasureItemRepository } from './span-measure-item.repository';
import { SpanMeasureItemService } from './span-measure-item.service';
import { domainSpanMeasureItem } from './__stubs__/span-measure-item';

jest.mock('./span-measure.repository');

// const prismaServiceMock: MockedObjectDeep<PrismaService> = {
// 	$executeRaw: jest.fn(),
// 	$queryRaw: jest.fn(),
// 	spanMeasures: {
// 		findMany: jest.fn().mockResolvedValue([domainSpanMeasure]),
// 	},
// 	...(<any>{}),
// };

const spanMeasureItemRepositoryMock: MockedObjectDeep<SpanMeasureItemRepository> = {
	findSpanMeasureItems: jest.fn().mockResolvedValue([domainSpanMeasureItem]),
	...(<any>{}),
};

const spanMeasureRepositoryMock: MockedObjectDeep<SpanMeasureRepository> = {
	findSpanMeasures: jest.fn().mockResolvedValue([domainSpanMeasure]),
	...(<any>{}),
};

const spanMeasureItemsServiceMock = new SpanMeasureItemService(spanMeasureItemRepositoryMock);

describe('Span Installation / SpanMeasure / Service', () => {
	test('findSpanMeasures returns array of SpanMeasure objects', async () => {
		const service = new SpanMeasureService(spanMeasureRepositoryMock, spanMeasureItemsServiceMock);
		const spanMeasures = await service.findSpanMeasures('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(spanMeasures).toBeInstanceOf(Array);
		expect(spanMeasures[0]).toBeInstanceOf(SpanMeasure);
		expect(spanMeasures).toEqual(
			[domainSpanMeasure].map((spanMeasure) => SpanMeasureFactory.CreateSpanMeasure(spanMeasure)),
		);
	});
});
