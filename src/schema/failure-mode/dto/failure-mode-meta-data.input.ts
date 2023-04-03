import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class FailureModeMetaDataInput {
	@IsOptional()
	@IsString()
	@Field({ nullable: true })
	public failureCause?: string;

	@IsOptional()
	@IsString()
	@Field({ nullable: true })
	public sourceOfFailure?: string;

	@IsOptional()
	@IsString()
	@Field({ nullable: true })
	public consequenceOfFailure?: string;

	@IsOptional()
	@IsString()
	@Field({ nullable: true })
	public causeOfFailureOther?: string;

	@IsOptional()
	@IsString()
	@Field({ nullable: true })
	public sourceOfFailureOther?: string;
}
