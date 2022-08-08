import { Field, InputType } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';

import { BaseSupportSystemInput } from './base-support-system.input';

@InputType()
export class CreateSupportSystemInput extends BaseSupportSystemInput {
	@Field()
	@MaxLength(255)
	public name: string;

	@Field()
	@IsUUID()
	public objectId: string;

	@Field()
	@IsUUID()
	public surveyId: string;
}
