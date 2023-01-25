import { ReachSegmentFactory } from './reach-segment.factory';
import { ReachSegment } from './models/reach-segment.model';
import { domainReachSegment } from './__stubs__';

describe('ARK / ReachSegment Factory', () => {
	test('CreateReachSegment() constructs an instance of a ReachSegment GraphQL model', () => {
		const result = ReachSegmentFactory.CreateReachSegment(domainReachSegment);
		const object = {
			...domainReachSegment,
			consequenceScore: Number(domainReachSegment.consequenceScore),
			failureModeScore: Number(domainReachSegment.failureModeScore),
			reachSegmentLength: Number(domainReachSegment.reachSegmentLength),
			riskScoreDigit: Number(domainReachSegment.riskScoreDigit),
			createdAt: domainReachSegment.created_at ?? null,
			updatedAt: domainReachSegment.updated_at ?? null,
		};

		delete object.created_at;
		delete object.updated_at;

		expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(ReachSegment);
	});
});
