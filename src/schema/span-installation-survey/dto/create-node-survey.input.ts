import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

import { BaseNodeSurveyInput } from './base-node-survey.input';

@InputType()
export class CreateNodeSurveyInput extends BaseNodeSurveyInput {
	@Field()
	@IsUUID()
	public supportSystemId: string;

	@Field()
	@IsUUID()
	public surveyId: string;
}
