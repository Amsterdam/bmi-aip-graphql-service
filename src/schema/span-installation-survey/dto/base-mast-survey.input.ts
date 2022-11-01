import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class BaseMastSurveyInput {
	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public mastDamage?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public mastMissingParts?: boolean;

	@IsOptional()
	@IsNumber()
	@Field({ nullable: true })
	public tensionMastAngle?: number;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public mastAttachmentDamage?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public mastBracketMissingParts?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public mastBracketDamage?: boolean;

	@IsOptional()
	@Field({ nullable: true })
	public remarks?: string;
}
