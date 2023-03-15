import { InputType } from '@nestjs/graphql';

import { BaseFacadeFollowUpSurveyInput } from './base-facade-follow-up-survey.input';

@InputType()
export class UpdateFacadeFollowUpSurveyInput extends BaseFacadeFollowUpSurveyInput {}
