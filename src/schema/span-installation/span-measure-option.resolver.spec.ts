import { MockedObjectDeep } from 'ts-jest';
import { QueryBus } from '@nestjs/cqrs';

import { SpanMeasureOptionResolver } from './span-measure-option.resolver';
import { FindSpanMeasureOptionsQuery } from './queries/find-span-measure-options.query';
import { domainSpanMeasure } from './__stubs__/span-measure';

const getQueryBusMock = (): MockedObjectDeep<QueryBus> => ({
	execute: jest.fn((query: any) => {
		switch (query.constructor.name) {
			case FindSpanMeasureOptionsQuery.name:
				return [domainSpanMeasure, domainSpanMeasure];
		}
	}),
	...(<any>{}),
});

describe('Span Installation / MeasureOptions / Resolver', () => {
	test('spanMeasureOptions returns an array of options', async () => {
		const queryBusMock = getQueryBusMock();
		const resolver = new SpanMeasureOptionResolver(queryBusMock);
		const options = await resolver.spanMeasureOptions();
		expect(options).toBeInstanceOf(Array);
	});
});
