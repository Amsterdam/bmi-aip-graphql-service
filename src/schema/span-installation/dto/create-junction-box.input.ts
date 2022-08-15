import { Field, InputType } from '@nestjs/graphql';
import { IsUUID, MaxLength } from 'class-validator';

import { BaseJunctionBoxInput } from './base-junction-box.input';

@InputType()
export class CreateJunctionBoxInput extends BaseJunctionBoxInput {
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
