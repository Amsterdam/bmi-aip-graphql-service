import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsOptional } from 'class-validator';

@InputType()
export class BaseSpanMeasureInput {
	@Field((type) => String)
	name: string;

	@Field((type) => String)
	decompositionId: string;

	@Field((type) => String)
	decompositionType: string;

	@IsOptional()
	@IsDate()
	@Field({ nullable: true })
	createdAt?: string;

	@IsOptional()
	@IsDate()
	@Field({ nullable: true })
	updatedAt?: string;
}
