import { Field, InputType } from '@nestjs/graphql';

import { BaseFacadeFollowUpSurveyInput } from './base-facade-follow-up-survey.input';

@InputType()
export class SaveFacadeFollowUpSurveyInput extends BaseFacadeFollowUpSurveyInput {
	@Field((type) => String)
	public remarks: string;
}
