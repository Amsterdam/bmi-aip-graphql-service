import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';

@InputType()
export class BaseNodeSurveyInput {
	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public nodeDamage?: boolean;

	@IsOptional()
	@Field({ nullable: true })
	public remarks?: string;
}
