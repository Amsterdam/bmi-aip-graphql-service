import { domainReachSegment, ReachSegment } from '../__stubs__';

export const ReachSegmentRepository = jest.fn(() => ({
	createReachSegment: jest.fn(() => ReachSegment),
	getReachSegments: jest.fn(() => [domainReachSegment]),
}));
