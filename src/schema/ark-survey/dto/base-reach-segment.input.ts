import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class BaseReachSegmentInput {
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
}
