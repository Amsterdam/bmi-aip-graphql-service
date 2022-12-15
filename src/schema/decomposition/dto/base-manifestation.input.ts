import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsOptional, IsUUID, MaxLength } from 'class-validator';

@InputType()
export class BaseManifestationInput {
	@IsOptional()
	@IsUUID()
	@Field({ nullable: true })
	public permanentId?: string;

	@Field({ nullable: true })
	@MaxLength(255)
	@IsOptional()
	public code?: string;

	@Field({ nullable: true })
	@MaxLength(255)
	@IsOptional()
	public location?: string;

	@Field({ nullable: true })
	@MaxLength(128)
	@IsOptional()
	public material?: string;

	@Field({ nullable: true })
	@IsInt()
	@IsOptional()
	public quantity?: number;

	@Field({ nullable: true })
	@MaxLength(4)
	@IsOptional()
	public quantityUnitOfMeasurement?: string;

	@Field({ nullable: true })
	@IsInt()
	@IsOptional()
	public constructionYear?: number;

	@Field({ nullable: true })
	@IsOptional()
	@IsInt()
	public gisibId?: number;

	@Field({ nullable: true })
	@IsOptional()
	@IsUUID()
	public conditionId?: string;

	@Field({ nullable: true })
	@IsOptional()
	@IsUUID()
	public observationPointId?: string;
}
