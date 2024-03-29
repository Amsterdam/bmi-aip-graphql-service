import { Prisma } from '@prisma/client';

import { CreateReachSegmentInput } from '../dto/create-reach-segment.input';
import { UpdateReachSegmentInput } from '../dto/update-reach-segment.input';

const reachSegments = Prisma.validator<Prisma.arkSurveyReachSegmentsArgs>()({
	select: {
		id: true,
		arkSurveyId: true,
		name: true,
		reachSegmentLength: true,
		riskScore: true,
		riskScoreDigit: true,
		failureModeScore: true,
		consequenceScore: true,
		sortNumber: true,
		created_at: true,
		updated_at: true,
	},
});

export type ReachSegment = Prisma.arkSurveyReachSegmentsGetPayload<typeof reachSegments>;

export interface IReachSegmentRepository {
	findReachSegments(arkSurveyId: string): Promise<ReachSegment[]>;
	createReachSegment(input: CreateReachSegmentInput): Promise<ReachSegment>;
	updateReachSegment(input: UpdateReachSegmentInput): Promise<ReachSegment>;
	deleteReachSegment(identifier: string): Promise<ReachSegment>;
}
