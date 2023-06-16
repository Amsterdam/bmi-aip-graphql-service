import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsEnum, IsOptional } from 'class-validator';

import { SpanDecompositionType } from '../types/span-decomposition-type';
import { IsValidMeasureOption } from '../../../decorators/is-valid-measure';

import { SpanMeasureStatus } from './../types/span-measure-status';

@InputType()
export class BaseSpanMeasureInput {
	@Field((type) => String)
	description: string;

	@Field((type) => String)
	decompositionId: string;

	@IsValidMeasureOption()
	@Field((type) => String)
	optionId: string;

	@Field((type) => String)
	@IsEnum(SpanDecompositionType)
	decompositionType: SpanDecompositionType;

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
