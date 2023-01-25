import { Prisma } from '@prisma/client';

import { newId } from '../../utils';

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
		created_at: created_at,
		updated_at: updated_at,
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
		reachSegment.created_at = created_at instanceof Date ? created_at.toUTCString() : null;
		reachSegment.updated_at = updated_at instanceof Date ? updated_at.toUTCString() : null;

		return reachSegment;
	}

	static CreateReachSegmentsFromJson(jsonData: Prisma.JsonValue, arkSurveyId: string): ReachSegment[] {
		if (!jsonData) return [];

		return JSON.parse(JSON.stringify(jsonData)).map((item) => ({
			...item,
			id: newId(),
			arkSurveyId,
		}));
	}
}
