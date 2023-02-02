import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

import { BaseConditionInput } from '../dto/base-condition.input';

@InputType()
export class UpdateConditionInput extends BaseConditionInput {
	@Field()
	@IsUUID()
	public id: string;
}
