import { ReachSegment } from './reach-segment.model';

describe('ARK ReachSegments', () => {
	test('constructs a ReachSegment instance', () => {
		const reachSegment = new ReachSegment();
		reachSegment.id = '71c5450a-c0a3-48ea-adbb-ea435a8804d5';
		reachSegment.arkSurveyId = '388ecaaa-c6c2-4613-aa14-f206cf577ca7';
		reachSegment.name = '__NAME__';
		reachSegment.reachSegmentLength = 1.23;
		reachSegment.riskScore = 2;
		reachSegment.riskScoreDigit = 1.23;
		reachSegment.failureModeScore = 1.23;
		reachSegment.consequenceScore = 1.23;
		reachSegment.sortNumber = 1;

		expect(reachSegment).toBeInstanceOf(ReachSegment);
	});
});
