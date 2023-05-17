import { Field, ObjectType, Parent, ResolveField } from '@nestjs/graphql';

import { SpanDecompositionType } from '../types/span-decomposition-type';

import { SpanMeasureItemOption } from './span-measure-item-option.model';

@ObjectType({ description: 'SpanMeasureOption' })
export class SpanMeasureOption {
	@Field((type) => String)
	id: string;

	@Field((type) => SpanDecompositionType, { nullable: true })
	decompositionType: string;

	@Field((type) => String)
	description: string;

	@Field((type) => [SpanMeasureItemOption], { nullable: true })
	measureItems: SpanMeasureItemOption[];
}
