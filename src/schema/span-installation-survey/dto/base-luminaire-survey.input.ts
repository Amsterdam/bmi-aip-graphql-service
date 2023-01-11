import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional } from 'class-validator';

@InputType()
export class BaseLuminaireSurveyInput {
	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public luminaireDamage?: boolean;

	@IsOptional()
	@Field({ nullable: true })
	public remarks?: string;
}
