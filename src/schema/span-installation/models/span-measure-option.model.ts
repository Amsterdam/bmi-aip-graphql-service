import { Field, ObjectType, Parent, ResolveField } from '@nestjs/graphql';

import { SpanDecompositionItemType } from '../types/span-decomposition-item-type';

import { SpanMeasureItemOption } from './span-measure-item-option.model';

@ObjectType({ description: 'SpanMeasureOption' })
export class SpanMeasureOption {
	@Field((type) => String)
	id: string;

	@Field((type) => SpanDecompositionItemType, { nullable: true })
	decompositionItemType: string;

	@Field((type) => String)
	description: string;

	@Field((type) => [SpanMeasureItemOption], { nullable: true })
	measureItems: SpanMeasureItemOption[];
}
