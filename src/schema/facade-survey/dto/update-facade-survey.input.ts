import { InputType } from '@nestjs/graphql';

import { BaseFacadeSurveyInput } from './base-facade-survey.input';

@InputType()
export class UpdateFacadeSurveyInput extends BaseFacadeSurveyInput {}
