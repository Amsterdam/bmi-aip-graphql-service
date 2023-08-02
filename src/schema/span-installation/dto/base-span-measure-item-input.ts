import { Field, InputType, Int } from '@nestjs/graphql';

import { IsValidMeasureOption } from '../../../decorators/is-valid-measure';
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

	@Field((type) => Int)
	quantityEstimate: number;

	@Field((type) => Int)
	quantityActual?: number;

	@Field(() => Boolean)
	isActive?: boolean;
}
