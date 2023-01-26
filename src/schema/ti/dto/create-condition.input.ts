import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

import { BaseConditionInput } from '../dto/base-condition.input';

@InputType()
export class CreateConditionInput extends BaseConditionInput {
	@Field()
	@IsUUID()
	public surveyId?: string;

	@Field()
	@IsUUID()
	public elementId?: string;

	@Field()
	@IsUUID()
	public unitId?: string;

	@Field()
	@IsUUID()
	public manifestationId?: string;
}
