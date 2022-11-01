import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

import { BaseJunctionBoxSurveyInput } from './base-junction-box-survey.input';

@InputType()
export class UpdateJunctionBoxSurveyInput extends BaseJunctionBoxSurveyInput {
	@Field()
	@IsUUID()
	public id: string;
}
