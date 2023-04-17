import { MockedObjectDeep } from 'ts-jest';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';

import { FindSpanMeasuresQuery } from './queries/find-span-measures.query';
import { domainSpanMeasure } from './__stubs__/span-measure';
import { SpanMeasureResolver } from './span-measure.resolver';
import { SpanMeasureService } from './span-measure.service';
import { SpanMeasureRepository } from './span-measure.repository';

jest.mock('./span-measure.service');
jest.mock('./span-measure.repository');

const getCommandBusMock = (): MockedObjectDeep<CommandBus> => ({
	execute: jest.fn((command: any) => {
		switch (
			command.constructor.name
			// case CreateSupportSystemCommand.name:
			// case UpdateSupportSystemCommand.name:
			// 	return domainSupportSystem;
			// case DeleteSupportSystemCommand.name:
			// 	return deletedSupportSystem;
		) {
		}
	}),
	...(<any>{}),
});

const getQueryBusMock = (): MockedObjectDeep<QueryBus> => ({
	execute: jest.fn((query: any) => {
		switch (query.constructor.name) {
			case FindSpanMeasuresQuery.name:
				return [domainSpanMeasure, domainSpanMeasure];
		}
	}),
	...(<any>{}),
});

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const spanMeasureRepo = new SpanMeasureRepository(prismaServiceMock);

describe('Span Installation / Measure / Resolver', () => {
	test('getSpanMeasures returns an array of span measure objects', async () => {
		const commandBusMock = getCommandBusMock();
		const queryBusMock = getQueryBusMock();
		const resolver = new SpanMeasureResolver(new SpanMeasureService(spanMeasureRepo), commandBusMock, queryBusMock);
		const elements = await resolver.spanInstallationMeasures('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(elements).toEqual([domainSpanMeasure, domainSpanMeasure]);
	});
});
