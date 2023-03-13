import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class InspectionStandardDataInput {
	@IsOptional()
	@Field((type) => String, { nullable: true })
	public remarks?: string;
}
