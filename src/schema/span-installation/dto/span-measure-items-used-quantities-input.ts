import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsUUID } from 'class-validator';
@InputType()
export class SpanMeasureItemsUsedQuantitiesInput {
	@Field()
	@IsUUID()
	public id: string;

	@Field((type) => Number, { nullable: true })
	@IsOptional()
	quantityActual: number;

	@Field((type) => Boolean, { nullable: true })
	@IsOptional()
	active: boolean;
}
