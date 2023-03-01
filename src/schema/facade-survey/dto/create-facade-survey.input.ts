import { InputType } from '@nestjs/graphql';

import { BaseFacadeSurveyInput } from './base-facade-survey.input';

@InputType()
export class CreateFacadeSurveyInput extends BaseFacadeSurveyInput {}
