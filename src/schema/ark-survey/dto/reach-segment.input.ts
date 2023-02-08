import { Field, Float, InputType } from '@nestjs/graphql';
import { IsOptional, Max, Min } from 'class-validator';
@InputType()
export class ReachSegmentInput {
	@IsOptional()
	@Field((type) => String, { nullable: true })
	public name?: string;

	@IsOptional()
	@Field((type) => Float, { nullable: true })
	public reachSegmentLength?: number;

	@IsOptional()
	@Field((type) => Number, { nullable: true })
	public riskScore?: number;

	@IsOptional()
	@Min(1)
	@Max(16)
	@Field((type) => Float, { nullable: true })
	public riskScoreDigit?: number;

	@IsOptional()
	@Min(1)
	@Max(4)
	@Field((type) => Float, { nullable: true })
	public failureModeScore?: number;

	@IsOptional()
	@Min(1)
	@Max(4)
	@Field((type) => Float, { nullable: true })
	public consequenceScore?: number;

	@IsOptional()
	@Field((type) => Float, { nullable: true })
	public sortNumber?: number;

	@IsOptional()
	@Field((type) => String, { nullable: true })
	public created_at: string;

	@IsOptional()
	@Field((type) => String, { nullable: true })
	public updated_at: string;
}
