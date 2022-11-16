import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';

@InputType()
export class GeographyRdInput {
	@IsOptional()
	@IsNumber()
	@Field({ nullable: true })
	public x?: number;

	@IsOptional()
	@IsNumber()
	@Field({ nullable: true })
	public y?: number;
}
