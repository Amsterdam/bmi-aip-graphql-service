import { MockedObjectDeep } from 'ts-jest';

import { SpanMeasureItem } from './models/span-measure-item.model';
import { SpanMeasureItemFactory } from './span-measure-item.factory';
import { SpanMeasureItemRepository } from './span-measure-item.repository';
import { SpanMeasureItemService } from './span-measure-item.service';
import { domainSpanMeasureItem } from './__stubs__/span-measure-item';

jest.mock('./span-measure-item.repository');

const spanMeasureItemRepositoryMock: MockedObjectDeep<SpanMeasureItemRepository> = {
	findSpanMeasureItems: jest.fn().mockResolvedValue([domainSpanMeasureItem]),
	...(<any>{}),
};

describe('Span Installation / SpanMeasureItem / Service', () => {
	test('getSpanMeasureItems returns array of SpanMeasureItem objects', async () => {
		const service = new SpanMeasureItemService(spanMeasureItemRepositoryMock);
		const spanMeasureItems = await service.findSpanMeasureItems('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(spanMeasureItems).toBeInstanceOf(Array);
		expect(spanMeasureItems[0]).toBeInstanceOf(SpanMeasureItem);
		expect(spanMeasureItems).toEqual(
			[domainSpanMeasureItem].map((spanMeasureItem) =>
				SpanMeasureItemFactory.CreateSpanMeasureItem(spanMeasureItem),
			),
		);
	});
});
