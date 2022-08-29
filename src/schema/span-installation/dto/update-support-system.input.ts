import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsUUID, MaxLength } from 'class-validator';

import { TypeDetailedSupportSystemInput } from './type-detailed-support-system.input';

@InputType()
export class UpdateSupportSystemInput extends TypeDetailedSupportSystemInput {
	@Field()
	@IsUUID()
	public id: string;

	@IsOptional()
	@Field()
	@MaxLength(255)
	public name?: string;
}
