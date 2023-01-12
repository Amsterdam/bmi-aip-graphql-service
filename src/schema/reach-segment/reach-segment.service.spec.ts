import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { ReachSegmentService } from './reach-segment.service';
import { ReachSegmentRepository } from './reach-segment.repository';
import { domainReachSegment } from './__stubs__';
import { ReachSegmentFactory } from './reach-segment.factory';
import { ReachSegment } from './models/reach-segment.model';

jest.mock('./reach-segment.repository');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const repo = new ReachSegmentRepository(prismaServiceMock);

describe('ARK Reach Segments / Service', () => {
	test('findReachSegments returns an array of ReachSegment objects', async () => {
		const service = new ReachSegmentService(repo);
		const ReachSegments = await service.findReachSegments('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(ReachSegments).toBeInstanceOf(Array);
		expect(ReachSegments[0]).toBeInstanceOf(ReachSegment);
		expect(ReachSegments).toEqual(
			[domainReachSegment].map((reachSegment) => ReachSegmentFactory.CreateReachSegment(reachSegment)),
		);
	});
});
