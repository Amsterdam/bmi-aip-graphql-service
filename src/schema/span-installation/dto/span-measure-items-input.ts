import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class SpanMeasureItemInput {
	@Field((type) => String)
	name: string;

	@Field((type) => String)
	itemType: string;

	@Field((type) => String)
	quantityUnitOfMeasurement: string;

	@Field((type) => Number)
	quantityEstimate: number;

	@Field((type) => Number)
	quantityActual: number;
}
