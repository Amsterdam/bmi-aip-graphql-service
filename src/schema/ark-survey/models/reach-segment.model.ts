import { Field, Float, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
@ObjectType({ description: 'reachSegment' })
export class ReachSegment {
	@Field((type) => String)
	@ApiProperty()
	id: string;

	@Field((type) => String)
	@ApiProperty()
	arkSurveyId: string;

	@Field((type) => String)
	@ApiProperty()
	name: string;

	@Field((type) => Float, { nullable: true })
	@ApiProperty()
	reachSegmentLength?: number;

	@Field((type) => Number, { nullable: true })
	@ApiProperty()
	riskScore?: number;

	@Field((type) => Float, { nullable: true })
	@ApiProperty()
	riskScoreDigit?: number;

	@Field((type) => Float, { nullable: true })
	@ApiProperty()
	failureModeScore?: number;

	@Field((type) => Float, { nullable: true })
	@ApiProperty()
	consequenceScore?: number;

	@Field((type) => Float, { nullable: true })
	@ApiProperty()
	sortNumber?: number;

	@Field((type) => String, { nullable: true })
	@ApiProperty()
	created_at: string;

	@Field((type) => String, { nullable: true })
	@ApiProperty()
	updated_at: string;

	@Field((type) => String, { nullable: true })
	@ApiProperty()
	deleted_at: string;
}
