import { Field, ObjectType, Parent, ResolveField } from '@nestjs/graphql';

import { SpanMeasureItem } from './span-measure-item.model';

@ObjectType({ description: 'spanMeasure' })
export class SpanMeasure {
	@Field((type) => String)
	id: string;

	@Field((type) => String)
	surveyId: string;

	@Field((type) => String)
	description: string;

	@Field((type) => String)
	decompositionId: string;

	@Field((type) => String)
	decompositionType: string;

	@Field((type) => [SpanMeasureItem], { nullable: 'itemsAndList' })
	measureItems: SpanMeasureItem[];

	@Field((type) => String, { nullable: true })
	createdAt: string;

	@Field((type) => String, { nullable: true })
	updatedAt: string;
}
