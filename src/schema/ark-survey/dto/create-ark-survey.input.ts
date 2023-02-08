import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

import { BaseArkSurveyInput } from './base-ark-survey.input';

@InputType()
export class CreateArkSurveyInput extends BaseArkSurveyInput {
	@Field()
	@IsUUID()
	public surveyId: string;
}
