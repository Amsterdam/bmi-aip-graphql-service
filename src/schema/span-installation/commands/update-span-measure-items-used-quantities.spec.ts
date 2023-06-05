import { MockedObjectDeep } from 'ts-jest';

import { SpanMeasureItemRepository } from '../span-measure-item.repository';
import { saveSpanMeasureItemsInput, domainSpanMeasureItem } from '../__stubs__/span-measure-item';

import { SaveSpanMeasureItemsCommand } from './save-span-measure-items.command';
import { SaveSpanMeasureItemsHandler } from './save-span-measure-items.handler';

const spanMeasureItemRepoMock: MockedObjectDeep<SpanMeasureItemRepository> = {
	saveSpanMeasureItems: jest.fn().mockResolvedValue([domainSpanMeasureItem]),
	...(<any>{}),
};

describe('SaveSpanMeasureItemsHandler', () => {
	test('executes command', async () => {
		const command = new SaveSpanMeasureItemsCommand(saveSpanMeasureItemsInput);
		const result = await new SaveSpanMeasureItemsHandler(spanMeasureItemRepoMock).execute(command);

		expect(spanMeasureItemRepoMock.saveSpanMeasureItems).toHaveBeenCalledTimes(1);
		expect(spanMeasureItemRepoMock.saveSpanMeasureItems).toHaveBeenCalledWith(saveSpanMeasureItemsInput);

		expect(result).toEqual([domainSpanMeasureItem]);
	});
});
