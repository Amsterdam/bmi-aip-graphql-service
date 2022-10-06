import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

import { BaseTensionWireSurveyInput } from './base-tension-wire-survey.input';

@InputType()
export class UpdateTensionWireSurveyInput extends BaseTensionWireSurveyInput {
	@Field()
	@IsUUID()
	public id: string;
}
