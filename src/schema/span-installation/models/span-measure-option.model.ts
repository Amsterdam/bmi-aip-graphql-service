import { Field, ObjectType, Parent, ResolveField } from '@nestjs/graphql';

import { SpanMeasureItemOption } from './span-measure-item-option.model';

@ObjectType({ description: 'SpanMeasureOption' })
export class SpanMeasureOption {
	@Field((type) => String)
	id: string;

	@Field((type) => String)
	entityListId: string;

	@Field((type) => String)
	description: string;

	@Field((type) => [SpanMeasureItemOption], { nullable: true })
	measureItems: SpanMeasureItemOption[];
}
