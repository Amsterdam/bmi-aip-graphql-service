import { ReachSegment } from '../__stubs__';

export const ReachSegmentService = jest.fn(() => ({
	findReachSegments: jest.fn(() => [ReachSegment, ReachSegment]),
}));
