import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { ReachSegmentRepository } from './reach-segment.repository';
import { domainReachSegment, createReachSegmentInput } from './__stubs__';

jest.mock('./types/reach-segment.repository.interface');

const prismaServiceMock: MockedObjectDeep<PrismaService> = {
	arkSurveyReachSegments: {
		create: jest.fn().mockResolvedValue(domainReachSegment),
		findMany: jest.fn().mockResolvedValue([domainReachSegment]),
		update: jest.fn().mockResolvedValue(domainReachSegment),
	},
	$executeRaw: jest.fn(),
	$queryRaw: jest.fn(),
	...(<any>{}),
};

let repository: ReachSegmentRepository;

describe('ARK/ ReachSegment / Repository', () => {
	beforeEach(() => {
		repository = new ReachSegmentRepository(prismaServiceMock);
	});

	test('createReachSegment()', async () => {
		const returnValue = await repository.createReachSegment(createReachSegmentInput);
		const reachSegment = prismaServiceMock.arkSurveyReachSegments.create.mock.calls[0][0].data;
		expect(reachSegment).toEqual(
			expect.objectContaining({
				id: reachSegment.id,
				arkSurveys: {
					connect: {
						id: '1f728e79-1b89-4333-a309-ea93bf17667c',
					},
				},
			}),
		);
		expect(returnValue).toEqual(domainReachSegment);
	});
});
