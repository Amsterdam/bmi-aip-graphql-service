import { MockedObjectDeep } from 'ts-jest';

import { PrismaService } from '../../prisma.service';

import { ReachSegmentRepository } from './ark-reach-segment.repository';
import { domainReachSegment, createReachSegmentInput } from './__stubs__';
import { ReachSegment } from './models/ark-reach-segment.model';

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
		const reachSegment = prismaServiceMock.arkSurveyReachSegments.create.mock.calls[0][0].data as ReachSegment;
		expect(reachSegment).toEqual(
			expect.objectContaining({
				id: reachSegment.id,
				surveys: {
					connect: {
						id: 'ad18b7c4-b2ef-4e6e-9bbf-c33360584cd7',
					},
				},
			}),
		);
		expect(returnValue).toEqual(
			expect.objectContaining({
				...createReachSegmentInput,
			}),
		);
	});
});