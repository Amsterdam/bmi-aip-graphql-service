import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsUUID } from 'class-validator';
@InputType()
export class SpanMeasureItemActualInput {
	@Field()
	@IsUUID()
	public id: string;

	@Field((type) => Boolean, { nullable: true })
	@IsOptional()
	quantityActual: number;

	@Field((type) => Boolean, { nullable: true })
	@IsOptional()
	active: boolean;
}
