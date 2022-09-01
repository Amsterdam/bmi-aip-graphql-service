import { Field, InputType } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';

import { TypeDetailedSupportSystemInput } from './type-detailed-support-system.input';

@InputType()
export class CreateSupportSystemInput extends TypeDetailedSupportSystemInput {
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
