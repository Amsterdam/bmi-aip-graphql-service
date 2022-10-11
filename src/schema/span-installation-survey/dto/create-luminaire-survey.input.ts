import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

import { BaseLuminaireSurveyInput } from './base-luminaire-survey.input';

@InputType()
export class CreateLuminaireSurveyInput extends BaseLuminaireSurveyInput {
	@Field()
	@IsUUID()
	public luminaireId: string;
}
