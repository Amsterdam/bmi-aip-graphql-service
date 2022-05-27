import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsOptional, MaxLength } from 'class-validator';

@InputType()
export class BaseManifestationInput {
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
}
