import { Field, InputType } from '@nestjs/graphql';
import { IsIn } from 'class-validator';
import { IsValidMeasureOption } from 'src/decorators/is-valid-measure';
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
}
