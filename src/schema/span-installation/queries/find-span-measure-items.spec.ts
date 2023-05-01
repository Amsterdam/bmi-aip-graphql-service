import { MockedObjectDeep } from 'ts-jest';

import { domainSpanMeasureItem } from '../__stubs__/span-measure-item';
import { SpanMeasureItemService } from '../span-measure-item.service';

import { FindSpanMeasureItemsQuery } from './find-span-measure-items.query';
import { FindSpanMeasureItemsHandler } from './find-span-measure-items.handler';

const SpanMeasureItemMock: MockedObjectDeep<SpanMeasureItemService> = {
	findSpanMeasureItems: jest.fn().mockResolvedValue([domainSpanMeasureItem]),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('FindSpanMeasureItemsHandler', () => {
	test('executes command', async () => {
		const command = new FindSpanMeasureItemsQuery(identifier);
		const result = await new FindSpanMeasureItemsHandler(SpanMeasureItemMock).execute(command);

		expect(SpanMeasureItemMock.findSpanMeasureItems).toHaveBeenCalledTimes(1);
		expect(SpanMeasureItemMock.findSpanMeasureItems).toHaveBeenCalledWith(identifier);

		expect(result).toEqual([domainSpanMeasureItem]);
	});
});
