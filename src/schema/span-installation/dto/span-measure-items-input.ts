import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsIn, IsOptional } from 'class-validator';

import { IsValidMeasureOption } from '../../../decorators/is-valid-measure';

import { SpanMeasureItemStatus } from './../types/span-measure-item-status';
@InputType()
export class SpanMeasureItemInput {
	@Field((type) => String)
	@IsValidMeasureOption()
	description: string;

	@Field((type) => String)
	@IsValidMeasureOption()
	optionId: string;

	@Field((type) => String)
	@IsIn(['material', 'specificationItem'])
	itemType: string;

	@Field((type) => String)
	quantityUnitOfMeasurement: string;

	@Field((type) => Number)
	quantityEstimate: number;

	@IsEnum(SpanMeasureItemStatus)
	@IsOptional()
	@Field(() => String, { nullable: true })
	status?: SpanMeasureItemStatus;
}
