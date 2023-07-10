import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsUUID } from 'class-validator';
@InputType()
export class SpanMeasureItemActualInput {
	@Field()
	@IsUUID()
	public id: string;

	@Field((type) => Number)
	@IsOptional()
	quantityActual: number;

	@Field((type) => Boolean, { nullable: true })
	@IsOptional()
	active: boolean;
}
