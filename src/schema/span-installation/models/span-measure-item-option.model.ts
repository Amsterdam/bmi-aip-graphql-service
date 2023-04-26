import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType({ description: 'spanMeasureItem' })
export class SpanMeasureItemOption {
	@Field((type) => String)
	id: string;

	@Field((type) => String)
	entityListId: string;

	@Field((type) => String)
	description: string;

	@Field((type) => String)
	itemType: string;
}
