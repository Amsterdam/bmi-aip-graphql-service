import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsOptional, IsUUID, MaxLength } from 'class-validator';

@InputType()
export class CreateElementInput {
	@Field()
	@MaxLength(255)
	public name: string;

	@Field({ nullable: true })
	@MaxLength(255)
	@IsOptional()
	public code?: string;

	@Field({ nullable: true })
	@MaxLength(255)
	@IsOptional()
	public location?: string;

	@Field()
	@IsUUID()
	public objectId: string;

	@Field()
	@IsUUID()
	public surveyId: string;

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

	// Columns that can be removed:
	// - isUtResultPlaceholder
}
