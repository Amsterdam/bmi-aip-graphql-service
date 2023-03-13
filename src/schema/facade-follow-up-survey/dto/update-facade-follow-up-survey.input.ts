import { InputType } from '@nestjs/graphql';
// import { IsOptional } from 'class-validator';

import { BaseFacadeFollowUpSurveyInput } from './base-facade-follow-up-survey.input';

@InputType()
export class UpdateFacadeFollowUpSurveyInput extends BaseFacadeFollowUpSurveyInput {}
