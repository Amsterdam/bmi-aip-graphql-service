import { Field, InputType, Int } from '@nestjs/graphql';
import { IsIn } from 'class-validator';

import { IsValidMeasureOption } from '../../../decorators/is-valid-measure';
@InputType()
export class SpanMeasureItemInput {
	@Field((type) => String)
	description: string;

	@Field((type) => String)
	@IsValidMeasureOption()
	optionId: string;

	@Field((type) => String)
	@IsIn(['material', 'specificationItem'])
	itemType: string;

	@Field((type) => String)
	quantityUnitOfMeasurement: string;

	@Field((type) => Int)
	quantityEstimate: number;
}
