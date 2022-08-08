import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsUUID, MaxLength } from 'class-validator';

import { BaseSupportSystemInput } from './base-support-system.input';

@InputType()
export class UpdateSupportSystemInput extends BaseSupportSystemInput {
	@Field()
	@IsUUID()
	public id: string;

	@IsOptional()
	@Field()
	@MaxLength(255)
	public name?: string;
}
