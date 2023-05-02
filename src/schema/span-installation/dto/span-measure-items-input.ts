import { Field, InputType } from '@nestjs/graphql';
import { IsIn } from 'class-validator';
@InputType()
export class SpanMeasureItemInput {
	@Field((type) => String)
	description: string;

	@Field((type) => String)
	optionId: string;

	@Field((type) => String)
	@IsIn(['material', 'specificationItem'])
	itemType: string;

	@Field((type) => String)
	quantityUnitOfMeasurement: string;

	@Field((type) => Number)
	quantityEstimate: number;
}