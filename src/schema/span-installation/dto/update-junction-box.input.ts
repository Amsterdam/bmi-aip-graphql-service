import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsUUID, MaxLength } from 'class-validator';

import { BaseJunctionBoxInput } from './base-junction-box.input';

@InputType()
export class UpdateJunctionBoxInput extends BaseJunctionBoxInput {
	@Field()
	@IsUUID()
	public id: string;

	@IsOptional()
	@Field()
	@MaxLength(255)
	public name?: string;
}
