import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType({ description: 'measureItem' })
export class SpanMeasureItem {
	@Field((type) => String)
	id: string;

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
