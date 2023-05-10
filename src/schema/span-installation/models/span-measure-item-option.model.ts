import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType({ description: 'spanMeasureItem' })
export class SpanMeasureItemOption {
	@Field((type) => String)
	id: string;

	@Field((type) => String)
	description?: string;

	@Field((type) => String)
	spanMeasureOptionId: string;

	@Field((type) => String)
	quantityUnitOfMeasurement?: string;

	@Field((type) => String)
	referenceNumber: string;

	@Field((type) => String)
	itemType: string;
}
