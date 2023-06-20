import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsEnum, IsOptional } from 'class-validator';

import { SpanDecompositionItemType } from '../types/span-decomposition-item-type';
import { IsValidMeasureOption } from '../../../decorators/is-valid-measure';

import { SpanMeasureStatus } from './../types/span-measure-status';

@InputType()
export class BaseSpanMeasureInput {
	@Field((type) => String)
	description: string;

	@Field((type) => String)
	decompositionItemId: string;

	@IsValidMeasureOption()
	@Field((type) => String)
	optionId: string;

	@Field((type) => String)
	@IsEnum(SpanDecompositionItemType)
	decompositionItemType: SpanDecompositionItemType;

	@IsEnum(SpanMeasureStatus)
	@IsOptional()
	@Field(() => String, { nullable: true })
	status?: SpanMeasureStatus;

	@IsOptional()
	@IsDate()
	@Field({ nullable: true })
	createdAt?: string;

	@IsOptional()
	@IsDate()
	@Field({ nullable: true })
	updatedAt?: string;
}
