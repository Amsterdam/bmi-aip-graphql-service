import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

import { BaseFailureModeInput } from './base-failure-mode.input';

@InputType()
export class UpdateFailureModeInput extends BaseFailureModeInput {
	@Field()
	@IsUUID()
	public id: string;

	@Field()
	@IsUUID()
	public surveyId: string;
}
