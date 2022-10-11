import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

import { BaseNodeSurveyInput } from './base-node-survey.input';

@InputType()
export class UpdateNodeSurveyInput extends BaseNodeSurveyInput {
	@Field()
	@IsUUID()
	public id: string;
}
