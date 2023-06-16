import { Field, ObjectType, Parent, ResolveField } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

import { SpanDecompositionItemType } from '../types/span-decomposition-item-type';

import { SpanMeasureItem } from './span-measure-item.model';
import { SpanMeasureStatus } from './../types/span-measure-status';

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
	decompositionItemId: string;

	@Field((type) => SpanDecompositionItemType, { nullable: true })
	decompositionItemType: string;

	@Field((type) => [SpanMeasureItem], { nullable: 'itemsAndList' })
	measureItems: SpanMeasureItem[];

	@Field(() => SpanMeasureStatus, { nullable: true })
	@IsOptional()
	status?: SpanMeasureStatus;

	@Field((type) => String, { nullable: true })
	created_at: string;

	@Field((type) => String, { nullable: true })
	updated_at: string;
}
