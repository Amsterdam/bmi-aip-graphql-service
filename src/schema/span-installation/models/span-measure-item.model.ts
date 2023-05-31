import { Field, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

import { SpanMeasureItemStatus } from './../types/span-measure-item-status';
@ObjectType({ description: 'spanMeasureItem' })
export class SpanMeasureItem {
	@Field((type) => String)
	id: string;

	@Field((type) => String)
	optionId: string;

	@Field((type) => String)
	description: string;

	@Field((type) => String)
	spanMeasureId: string;

	@Field((type) => String)
	itemType: string;

	@Field((type) => String)
	quantityUnitOfMeasurement: string;

	@Field((type) => String)
	quantityEstimate: number;

	@IsOptional()
	@Field((type) => String, { nullable: true })
	quantityActual?: number;

	@Field(() => SpanMeasureItemStatus, { nullable: true })
	@IsOptional()
	status?: SpanMeasureItemStatus;

	@Field(() => Boolean)
	isActive: boolean;
}
