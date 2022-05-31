import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsOptional, IsUUID, MaxLength } from 'class-validator';

@InputType()
export class BaseUnitInput {
	@IsOptional()
	@MaxLength(255)
	@Field({ nullable: true })
	public code?: string;

	@IsOptional()
	@MaxLength(255)
	@Field({ nullable: true })
	public location?: string;

	@IsOptional()
	@MaxLength(128)
	@Field({ nullable: true })
	public material?: string;

	@IsOptional()
	@IsInt()
	@Field({ nullable: true })
	public quantity?: number;

	@IsOptional()
	@MaxLength(4)
	@Field({ nullable: true })
	public quantityUnitOfMeasurement?: string;

	@IsOptional()
	@IsInt()
	@Field({ nullable: true })
	public constructionYear?: number;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public isArchived?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public isStructural?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public isElectrical?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public isStructuralObjectSpecific?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public isElectricalObjectSpecific?: boolean;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public isRelevant?: boolean;

	@Field({ nullable: true })
	@IsOptional()
	@IsUUID()
	public gisibId?: string;

	@Field({ nullable: true })
	@IsOptional()
	@IsUUID()
	public conditionId?: string;

	@Field({ nullable: true })
	@IsOptional()
	@IsUUID()
	public observationPointId?: string;
}
