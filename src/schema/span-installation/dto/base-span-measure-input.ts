import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsEnum, IsOptional } from 'class-validator';

import { SpanDecompositionType } from '../types/span-decomposition-type';

@InputType()
export class BaseSpanMeasureInput {
	@Field((type) => String)
	description: string;

	@Field((type) => String)
	decompositionId: string;

	@Field((type) => String)
	optionId: string;

	@Field((type) => String)
	@IsEnum(SpanDecompositionType)
	decompositionType: SpanDecompositionType;

	@IsOptional()
	@IsDate()
	@Field({ nullable: true })
	createdAt?: string;

	@IsOptional()
	@IsDate()
	@Field({ nullable: true })
	updatedAt?: string;
}
