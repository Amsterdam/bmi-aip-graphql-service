import { ReachSegment } from './models/reach-segment.model';
import { ReachSegment as DomainReachSegment } from './types/reach-segment.repository.interface';

export class ReachSegmentFactory {
	static CreateReachSegment({
		id,
		arkSurveyId,
		name,
		reachSegmentLength,
		riskScore,
		riskScoreDigit,
		failureModeScore,
		consequenceScore,
		sortNumber,
		created_at: createdAt,
		updated_at: updatedAt,
	}: DomainReachSegment): ReachSegment {
		const reachSegment = new ReachSegment();
		reachSegment.id = id;
		reachSegment.arkSurveyId = arkSurveyId;
		reachSegment.name = name;
		reachSegment.reachSegmentLength = Number(reachSegmentLength);
		reachSegment.riskScore = riskScore;
		reachSegment.riskScoreDigit = Number(riskScoreDigit);
		reachSegment.failureModeScore = Number(failureModeScore);
		reachSegment.consequenceScore = Number(consequenceScore);
		reachSegment.sortNumber = Number(sortNumber);
		reachSegment.createdAt = createdAt instanceof Date ? createdAt.toUTCString() : null;
		reachSegment.updatedAt = updatedAt instanceof Date ? updatedAt.toUTCString() : null;

		return reachSegment;
	}
}
