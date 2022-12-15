import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsUUID, MaxLength } from 'class-validator';

import { BaseElementInput } from './base-element.input';

@InputType()
export class UpdateElementInput extends BaseElementInput {
	@Field()
	@IsUUID()
	public id: string;

	@Field()
	@MaxLength(255)
	@IsOptional()
	public name?: string;
}
