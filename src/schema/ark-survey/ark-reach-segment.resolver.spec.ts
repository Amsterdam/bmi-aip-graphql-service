import { MockedObjectDeep } from 'ts-jest';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { PrismaService } from '../../prisma.service';

import { ReachSegmentResolver } from './ark-reach-segment.resolver';
import { ReachSegmentService } from './ark-reach-segment.service';
import { ReachSegmentRepository } from './ark-reach-segment.repository';
import { domainReachSegment, createReachSegmentInput, deletedReachSegment } from './__stubs__';
import { CreateReachSegmentCommand } from './commands/create-reach-segment.command';
import { ReachSegment } from './models/ark-reach-segment.model';
import { UpdateReachSegmentCommand } from './commands/update-reach-segment.command';
import { DeleteReachSegmentCommand } from './commands/delete-reach-segment.command';
import { FindReachSegmentsQuery } from './queries/find-reach-segments.query';

jest.mock('./ark-reach-segment.service');
jest.mock('./ark-reach-segment.repository');

const getCommandBusMock = (): MockedObjectDeep<CommandBus> => ({
	execute: jest.fn((command: any) => {
		switch (command.constructor.name) {
			case CreateReachSegmentCommand.name:
			case UpdateReachSegmentCommand.name:
				return domainReachSegment;
			case DeleteReachSegmentCommand.name:
				return deletedReachSegment;
		}
	}),
	...(<any>{}),
});

const getQueryBusMock = (): MockedObjectDeep<QueryBus> => ({
	execute: jest.fn((query: any) => {
		switch (query.constructor.name) {
			case FindReachSegmentsQuery.name:
				return [domainReachSegment, domainReachSegment];
		}
	}),
	...(<any>{}),
});

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const ReachSegmentRepo = new ReachSegmentRepository(prismaServiceMock);

describe('Span Installation / ReachSegment / Resolver', () => {
	describe('createReachSegment', () => {
		test('creates and returns an element', async () => {
			const commandBusMock = getCommandBusMock();
			const queryBusMock = getQueryBusMock();
			const resolver = new ReachSegmentResolver(
				new ReachSegmentService(ReachSegmentRepo),
				commandBusMock,
				queryBusMock,
			);
			const result = await resolver.createReachSegment(createReachSegmentInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new CreateReachSegmentCommand(createReachSegmentInput));

			expect(result).toBeInstanceOf(ReachSegment);
			expect(typeof result.id).toBe('string');
		});
	});

	test('getSurveyReachSegments returns an array of ReachSegment objects', async () => {
		const commandBusMock = getCommandBusMock();
		const queryBusMock = getQueryBusMock();
		const resolver = new ReachSegmentResolver(
			new ReachSegmentService(ReachSegmentRepo),
			commandBusMock,
			queryBusMock,
		);
		const elements = await resolver.arkSurveyReachSegments('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(elements).toEqual([domainReachSegment, domainReachSegment]);
	});
});
