import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType({ description: 'spanMeasureItem' })
export class SpanMeasureItem {
	@Field((type) => String)
	id: string;

	@Field((type) => String)
	optionId: string;

	@Field((type) => String)
	description: string;

	@Field((type) => String)
	spanMeasureId: string;

	@Field((type) => String)
	itemType: string;

	@Field((type) => String)
	quantityUnitOfMeasurement: string;

	@Field((type) => String)
	quantityEstimate: number;

	@Field((type) => String)
	quantityActual?: number;
}
