import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';

@InputType()
export class SpanMeasuresInspectionStandardDataInput {
	@IsOptional()
	@MaxLength(255)
	@Field((type) => String, { nullable: true })
	public generalRemarks?: string;
}
