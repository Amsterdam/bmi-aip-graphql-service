import { ReachSegment, domainReachSegment } from '../__stubs__';

export const ReachSegmentRepository = jest.fn(() => ({
	createReachSegment: jest.fn(() => ReachSegment),
	findReachSegments: jest.fn(() => [domainReachSegment]),
}));
