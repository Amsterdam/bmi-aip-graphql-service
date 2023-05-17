import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { IsArrayOfObjects } from '../../../decorators/is-array-of-objects';

import { SpanMeasureItemActualInput } from './span-measure-items-actuals-input';

@InputType()
export class UpdateSpanMeasureItemsActualsInput {
	@Field((type) => String)
	spanMeasureId: string;

	@Field(() => [SpanMeasureItemActualInput], { nullable: true })
	@IsArrayOfObjects()
	@ValidateNested({ each: true })
	@Type(() => SpanMeasureItemActualInput)
	public spanMeasureItemActuals?: SpanMeasureItemActualInput[];
}
