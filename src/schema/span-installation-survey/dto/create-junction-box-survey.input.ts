import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

import { BaseJunctionBoxSurveyInput } from './base-junction-box-survey.input';

@InputType()
export class CreateJunctionBoxSurveyInput extends BaseJunctionBoxSurveyInput {
	@Field()
	@IsUUID()
	public junctionBoxId: string;

	@Field()
	@IsUUID()
	public surveyId: string;
}
