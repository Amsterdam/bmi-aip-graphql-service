import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

import { BaseTensionWireSurveyInput } from './base-tension-wire-survey.input';

@InputType()
export class CreateTensionWireSurveyInput extends BaseTensionWireSurveyInput {
	@Field()
	@IsUUID()
	public supportSystemId: string;
}
