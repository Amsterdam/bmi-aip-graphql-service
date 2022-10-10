import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class BaseFacadeSurveyInput {
	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public mastDamage?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public facadeDamageWithin1m?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public hinderingVegetation?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public wallPlateDamage?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public faultyMontage?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public nutNotFullyOverThreadedRod?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public missingFasteners?: boolean;

	@IsOptional()
	@IsNumber()
	@Field({ nullable: true })
	public measuredPreload?: number;

	@IsOptional()
	@IsNumber()
	@Field({ nullable: true })
	public appliedAdditionalTraction?: number;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public facadeConnectionFailed?: boolean;

	@IsOptional()
	@IsNumber()
	@Field({ nullable: true })
	public facadeConnectionFailureAdditionalTraction?: number;

	@IsOptional()
	@Field({ nullable: true })
	public remarks?: string;
}
