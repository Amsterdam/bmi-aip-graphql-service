import { Field, InputType } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';

import { BaseUnitInput } from './base-unit.input';

@InputType()
export class CreateUnitInput extends BaseUnitInput {
	@Field()
	@MaxLength(255)
	public name: string;

	@Field()
	@IsUUID()
	public objectId: string;

	@Field()
	@IsUUID()
	public surveyId: string;

	@Field()
	@IsUUID()
	public elementId: string;
}
