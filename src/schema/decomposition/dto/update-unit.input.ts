import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsUUID, MaxLength } from 'class-validator';

import { BaseUnitInput } from './base-unit.input';

@InputType()
export class UpdateUnitInput extends BaseUnitInput {
	@Field()
	@IsUUID()
	public id: string;

	@Field()
	@IsUUID()
	public permanentId: string;

	@Field()
	@MaxLength(255)
	@IsOptional()
	public name?: string;
}
