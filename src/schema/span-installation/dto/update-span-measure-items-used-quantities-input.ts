import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { IsArrayOfObjects } from '../../../decorators/is-array-of-objects';

import { SpanMeasureItemsUsedQuantitiesInput } from './span-measure-items-used-quantities-input';

@InputType()
export class UpdateSpanMeasureItemsUsedQuantitiesInput {
	@Field((type) => String)
	spanMeasureId: string;

	@Field(() => [SpanMeasureItemsUsedQuantitiesInput], { nullable: true })
	@IsArrayOfObjects()
	@ValidateNested({ each: true })
	@Type(() => SpanMeasureItemsUsedQuantitiesInput)
	public spanMeasureItemsUsedQuantities?: SpanMeasureItemsUsedQuantitiesInput[];
}
