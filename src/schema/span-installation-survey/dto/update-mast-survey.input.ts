import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

import { BaseMastSurveyInput } from './base-mast-survey.input';

@InputType()
export class UpdateMastSurveyInput extends BaseMastSurveyInput {
	@Field()
	@IsUUID()
	public id: string;
}
