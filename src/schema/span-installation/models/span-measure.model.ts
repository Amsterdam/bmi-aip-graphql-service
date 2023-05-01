import { Field, ObjectType, Parent, ResolveField } from '@nestjs/graphql';

import { SpanDecompositionType } from '../types/span-decomposition-type';

import { SpanMeasureItem } from './span-measure-item.model';

@ObjectType({ description: 'spanMeasure' })
export class SpanMeasure {
	@Field((type) => String)
	id: string;

	@Field((type) => String)
	surveyId: string;

	@Field((type) => String)
	optionId: string;

	@Field((type) => String)
	description: string;

	@Field((type) => String)
	decompositionId: string;

	@Field((type) => SpanDecompositionType, { nullable: true })
	decompositionType: string;

	@Field((type) => [SpanMeasureItem], { nullable: 'itemsAndList' })
	measureItems: SpanMeasureItem[];

	@Field((type) => String, { nullable: true })
	created_at: string;

	@Field((type) => String, { nullable: true })
	updated_at: string;
}
