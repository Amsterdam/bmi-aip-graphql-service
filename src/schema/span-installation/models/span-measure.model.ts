import { Field, ObjectType } from '@nestjs/graphql';

import { SpanMeasureItem } from '../types/measures';

@ObjectType({ description: 'spanMeasure' })
export class SpanMeasure {
	@Field((type) => String)
	id: string;

	@Field((type) => String)
	name: string;

	@Field((type) => String, { nullable: true })
	spanMeasureItems?: SpanMeasureItem[];
}
