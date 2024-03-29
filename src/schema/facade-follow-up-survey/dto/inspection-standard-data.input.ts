import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';

@InputType()
export class InspectionStandardDataInput {
	@IsOptional()
	@MaxLength(255)
	@Field((type) => String, { nullable: true })
	public remarks?: string;
}
