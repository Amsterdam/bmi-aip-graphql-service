import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

import { BaseArkSurveyGeographyDataInput } from './base-ark-survey-geography-data.input';

@InputType()
export class CreateArkSurveyGeographyDataInput extends BaseArkSurveyGeographyDataInput {
	@Field()
	@IsUUID()
	public surveyId: string;
}
