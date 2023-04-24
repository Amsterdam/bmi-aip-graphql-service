import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { IsArrayOfObjects } from 'src/decorators/is-array-of-objects';

import { SpanMeasureItemInput } from './span-measure-items-input';

@InputType()
export class SaveSpanMeasureItemsInput {
	@Field((type) => String)
	spanMeasureId: string;

	@Field((type) => String)
	entityListId: string;

	@Field(() => [SpanMeasureItemInput], { nullable: true })
	@IsArrayOfObjects()
	@ValidateNested({ each: true })
	@Type(() => SpanMeasureItemInput)
	public spanMeasureItems?: SpanMeasureItemInput[];
}
