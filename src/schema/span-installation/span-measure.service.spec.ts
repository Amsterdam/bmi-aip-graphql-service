import { MockedObjectDeep } from 'ts-jest';

import { newId } from '../../utils';

import { SpanMeasure } from './models/span-measure.model';
import { SpanMeasureFactory } from './span-measure.factory';
import { SpanMeasureRepository } from './span-measure.repository';
import { SpanMeasureService } from './span-measure.service';
import { domainSpanMeasure } from './__stubs__/span-measure';
import { SpanMeasureItemRepository } from './span-measure-item.repository';
import { SpanMeasureItemService } from './span-measure-item.service';
import { domainSpanMeasureItem } from './__stubs__/span-measure-item';
import { SpanMeasureItemStatus } from './types/span-measure-item-status';
import { SpanMeasureItem } from './models/span-measure-item.model';
import { SpanDecompositionType } from './types/span-decomposition-type';

jest.mock('./span-measure.repository');

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

	test('determineSpanMeasureItemStatus returns `open` give the right state', async () => {
		const service = new SpanMeasureItemService(spanMeasureItemRepositoryMock);
		const spanMeasureItem = new SpanMeasureItem();
		spanMeasureItem.id = newId();
		spanMeasureItem.spanMeasureId = newId();
		spanMeasureItem.itemType = SpanDecompositionType.spanJunctionBox;
		spanMeasureItem.quantityEstimate = null;
		spanMeasureItem.quantityActual = null;

		const status = service.determineSpanMeasureItemStatus(spanMeasureItem);

		expect(status).toEqual(SpanMeasureItemStatus.open);
	});

	test('determineSpanMeasureItemStatus returns `proposal` give the right state', async () => {
		const service = new SpanMeasureItemService(spanMeasureItemRepositoryMock);
		const spanMeasureItem = new SpanMeasureItem();
		spanMeasureItem.id = newId();
		spanMeasureItem.spanMeasureId = newId();
		spanMeasureItem.itemType = SpanDecompositionType.spanJunctionBox;
		spanMeasureItem.quantityEstimate = 1;
		spanMeasureItem.quantityActual = null;

		const status = service.determineSpanMeasureItemStatus(spanMeasureItem);

		expect(status).toEqual(SpanMeasureItemStatus.proposal);
	});

	test('determineSpanMeasureItemStatus returns `active` give the right state', async () => {
		const service = new SpanMeasureItemService(spanMeasureItemRepositoryMock);
		const spanMeasureItem = new SpanMeasureItem();
		spanMeasureItem.id = newId();
		spanMeasureItem.spanMeasureId = newId();
		spanMeasureItem.itemType = SpanDecompositionType.spanJunctionBox;
		spanMeasureItem.quantityEstimate = 1;
		spanMeasureItem.quantityActual = null;
		spanMeasureItem.isActive = true;

		const status = service.determineSpanMeasureItemStatus(spanMeasureItem);

		expect(status).toEqual(SpanMeasureItemStatus.active);
	});

	test('determineSpanMeasureItemStatus returns `completed` give the right state', async () => {
		const service = new SpanMeasureItemService(spanMeasureItemRepositoryMock);
		const spanMeasureItem = new SpanMeasureItem();
		spanMeasureItem.id = newId();
		spanMeasureItem.spanMeasureId = newId();
		spanMeasureItem.itemType = SpanDecompositionType.spanJunctionBox;
		spanMeasureItem.quantityEstimate = 1;
		spanMeasureItem.quantityActual = 2;

		const status = service.determineSpanMeasureItemStatus(spanMeasureItem);

		expect(status).toEqual(SpanMeasureItemStatus.completed);
	});
});
