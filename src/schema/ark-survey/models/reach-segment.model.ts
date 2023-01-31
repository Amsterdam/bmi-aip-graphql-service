import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
@ObjectType({ description: 'reachSegment' })
export class ReachSegment {
	@Field((type) => ID)
	id: string;

	@Field((type) => String)
	arkSurveyId: string;

	@Field((type) => String)
	name: string;

	@Field((type) => Float, { nullable: true })
	reachSegmentLength?: number;

	@Field((type) => Number, { nullable: true })
	riskScore?: number;

	@Field((type) => Float, { nullable: true })
	riskScoreDigit?: number;

	@Field((type) => Float, { nullable: true })
	failureModeScore?: number;

	@Field((type) => Float, { nullable: true })
	consequenceScore?: number;

	@Field((type) => Float, { nullable: true })
	sortNumber?: number;

	@Field((type) => String, { nullable: true })
	createdAt: string;

	@Field((type) => String, { nullable: true })
	updatedAt: string;
}
