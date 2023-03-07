import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

import { BaseFacadeFollowUpSurveyInput } from './base-facade-follow-up-survey.input';

@InputType()
export class SaveFacadeFollowUpSurveyInput extends BaseFacadeFollowUpSurveyInput {
	@IsOptional()
	@Field({ nullable: true })
	public remarks?: string;
}
