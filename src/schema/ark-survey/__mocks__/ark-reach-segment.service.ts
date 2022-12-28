import { ReachSegment } from '../__stubs__';

export const ReachSegmentService = jest.fn(() => ({
	getReachSegments: jest.fn(() => [ReachSegment, ReachSegment]),
}));
