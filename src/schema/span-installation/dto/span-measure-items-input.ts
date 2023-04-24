import { Field, InputType } from '@nestjs/graphql';
import { IsIn } from 'class-validator';
@InputType()
export class SpanMeasureItemInput {
	@Field((type) => String)
	name: string;

	@Field((type) => String)
	@IsIn(['material', 'specificationItem'])
	itemType: string;

	@Field((type) => String)
	quantityUnitOfMeasurement: string;

	@Field((type) => Number)
	quantityEstimate: number;

	@Field((type) => Number)
	quantityActual: number;
}
