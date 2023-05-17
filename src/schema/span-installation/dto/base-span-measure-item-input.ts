import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsOptional } from 'class-validator';

import { IsValidMeasureOption } from '../../../decorators/is-valid-measure';

import { SpanMeasureItemStatus } from './../types/span-measure-item-status';

@InputType()
export class BaseSpanMeasureItemInput {
	@Field((type) => String)
	description: string;

	@Field((type) => String)
	spanMeasureId: string;

	@IsValidMeasureOption()
	@Field((type) => String)
	optionId: string;

	@Field((type) => String)
	itemType: string;

	@Field((type) => String)
	quantityUnitOfMeasurement: string;

	@Field((type) => String)
	quantityEstimate: number;

	@Field((type) => String)
	quantityActual: number;

	@IsEnum(SpanMeasureItemStatus)
	@IsOptional()
	@Field(() => String, { nullable: true })
	status?: SpanMeasureItemStatus;
}
