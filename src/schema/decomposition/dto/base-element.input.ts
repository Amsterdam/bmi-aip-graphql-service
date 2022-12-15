import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsOptional, IsUUID, MaxLength } from 'class-validator';

@InputType()
export class BaseElementInput {
	@IsOptional()
	@MaxLength(255)
	@Field({ nullable: true })
	public code?: string;

	@IsOptional()
	@MaxLength(255)
	@Field({ nullable: true })
	public location?: string;

	@IsOptional()
	@IsUUID()
	@Field({ nullable: true })
	public categoryId?: string;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public isStructural?: boolean;

	@IsOptional()
	@IsInt()
	@Field({ nullable: true })
	public constructionYear?: number;

	@IsOptional()
	@MaxLength(255)
	@Field({ nullable: true })
	public constructionType?: string;

	@IsOptional()
	@MaxLength(255)
	@Field({ nullable: true })
	public elementGroupName?: string;

	@IsOptional()
	@IsBoolean()
	@Field({ nullable: true })
	public isArchived?: boolean;

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

	@IsOptional()
	@IsInt()
	@Field({ nullable: true })
	public gisibId?: number;

	@IsOptional()
	@IsUUID()
	@Field({ nullable: true })
	public conditionId?: string;

	@IsOptional()
	@IsUUID()
	@Field({ nullable: true })
	public observationPointId?: string;

	// Columns that can be removed:
	// - isUtResultPlaceholder
}
