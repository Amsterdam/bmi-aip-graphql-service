import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

import { BaseFailureModeInput } from '../dto/base-failure-mode.input';

@InputType()
export class CreateFailureModeInput extends BaseFailureModeInput {
	@Field()
	@IsUUID()
	public surveyId: string;
}
