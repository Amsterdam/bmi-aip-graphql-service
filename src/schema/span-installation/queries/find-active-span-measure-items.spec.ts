import { MockedObjectDeep } from 'ts-jest';

import { domainSpanMeasureItem } from '../__stubs__/span-measure-item';
import { SpanMeasureItemService } from '../span-measure-item.service';

import { FindActiveSpanMeasureItemsQuery } from './find-active-span-measure-items.query';
import { FindActiveSpanMeasureItemsHandler } from './find-active-span-measure-items.handler';

const SpanMeasureItemMock: MockedObjectDeep<SpanMeasureItemService> = {
	findActiveSpanMeasureItems: jest.fn().mockResolvedValue([domainSpanMeasureItem]),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('FindSpanMeasureItemsHandler', () => {
	test('executes command', async () => {
		const command = new FindActiveSpanMeasureItemsQuery(identifier);
		const result = await new FindActiveSpanMeasureItemsHandler(SpanMeasureItemMock).execute(command);

		expect(SpanMeasureItemMock.findActiveSpanMeasureItems).toHaveBeenCalledTimes(1);
		expect(SpanMeasureItemMock.findActiveSpanMeasureItems).toHaveBeenCalledWith(identifier);

		expect(result).toEqual([domainSpanMeasureItem]);
	});
});
