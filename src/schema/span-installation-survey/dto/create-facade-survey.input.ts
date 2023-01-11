import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

import { BaseFacadeSurveyInput } from './base-facade-survey.input';

@InputType()
export class CreateFacadeSurveyInput extends BaseFacadeSurveyInput {
	@Field()
	@IsUUID()
	public supportSystemId: string;
}
