import { MockedObjectDeep } from 'ts-jest';

import { SpanMeasure } from './models/span-measure.model';
import { SpanMeasureFactory } from './span-measure.factory';
import { SpanMeasureRepository } from './span-measure.repository';
import { SpanMeasureService } from './span-measure.service';
import { domainSpanMeasure } from './__stubs__/span-measure';

jest.mock('./span-measure.repository');

const spanMeasureRepositoryMock: MockedObjectDeep<SpanMeasureRepository> = {
	findSpanMeasures: jest.fn().mockResolvedValue([domainSpanMeasure]),
	...(<any>{}),
};

describe('Span Installation / SpanMeasure / Service', () => {
	test('findSpanMeasures returns array of SpanMeasure objects', async () => {
		const service = new SpanMeasureService(spanMeasureRepositoryMock);
		const spanMeasures = await service.findSpanMeasures('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(spanMeasures).toBeInstanceOf(Array);
		expect(spanMeasures[0]).toBeInstanceOf(SpanMeasure);
		expect(spanMeasures).toEqual(
			[domainSpanMeasure].map((spanMeasure) => SpanMeasureFactory.CreateSpanMeasure(spanMeasure)),
		);
	});
});
