import { Field, Float, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
@ObjectType({ description: 'reachSegment' })
export class ReachSegment {
	@Field((type) => String)
	@ApiProperty({ description: 'The identifier of ReachSegment (rakdeel) in AIP' })
	id: string;

	@Field((type) => String)
	@ApiProperty()
	arkSurveyId: string;

	@Field((type) => String)
	@ApiProperty()
	name: string;

	@Field((type) => Float, { nullable: true })
	@ApiProperty({ description: 'The `Rakdeellengte` in meters' })
	reachSegmentLength?: number;

	@Field((type) => Number, { nullable: true })
	@ApiProperty({ description: 'The `Risicoscore` as a value' })
	riskScore?: number;

	@Field((type) => Float, { nullable: true })
	@ApiProperty({ description: 'The `Risicoscore` in digits' })
	riskScoreDigit?: number;

	@Field((type) => Float, { nullable: true })
	@ApiProperty({ description: 'The `Faalscore` as a value' })
	failureModeScore?: number;

	@Field((type) => Float, { nullable: true })
	@ApiProperty({ description: 'The `Gevolgenscore` as a value' })
	consequenceScore?: number;

	@Field((type) => Float, { nullable: true })
	sortNumber?: number;

	@Field((type) => String, { nullable: true })
	@ApiProperty({ description: 'The date this `Rakdeel` has been registered' })
	created_at: string;

	@Field((type) => String, { nullable: true })
	updated_at: string;

	@Field((type) => String, { nullable: true })
	deleted_at: string;
}
