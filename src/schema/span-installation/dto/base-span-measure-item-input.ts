import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BaseSpanMeasureItemInput {
	@Field((type) => String)
	id: string;

	@Field((type) => String)
	name: string;

	@Field((type) => String)
	spanMeasureId: string;

	@Field((type) => String)
	itemType: string;

	@Field((type) => String)
	quantityUnitOfMeasurement: string;

	@Field((type) => String)
	quantityEstimate: number;

	@Field((type) => String)
	quantityActual: number;
}
