import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

import { BaseArkSurveyInput } from './base-ark-survey.input';

@InputType()
export class UpdateArkSurveyInput extends BaseArkSurveyInput {
	@Field()
	@IsUUID()
	public id: string;
}
