import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { ReachSegmentService } from './ark-reach-segment.service';
import { ReachSegmentRepository } from './ark-reach-segment.repository';
import { domainReachSegment } from './__stubs__';
import { ReachSegmentFactory } from './ark-reach-segment.factory';
import { ReachSegment } from './models/ark-reach-segment.model';

jest.mock('./ark-reach-segment.repository');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	...(<any>{}),
};

const repo = new ReachSegmentRepository(prismaServiceMock);

describe('ARK Reach Segments / Service', () => {
	test('getReachSegments returns an array of ReachSegment objects', async () => {
		const service = new ReachSegmentService(repo);
		const ReachSegments = await service.getReachSegments('ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7');
		expect(ReachSegments).toBeInstanceOf(Array);
		expect(ReachSegments[0]).toBeInstanceOf(ReachSegment);
		expect(ReachSegments).toEqual(
			[domainReachSegment].map((reachSegment) => ReachSegmentFactory.CreateReachSegment(reachSegment)),
		);
	});
});
