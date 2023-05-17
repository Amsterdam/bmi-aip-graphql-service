import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
@InputType()
export class SpanMeasureItemActualInput {
	@Field()
	@IsUUID()
	public id: string;

	@Field((type) => Number)
	quantityActual: number;
}
