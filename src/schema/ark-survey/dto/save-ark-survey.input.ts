import { InputType } from '@nestjs/graphql';

import { BaseArkSurveyInput } from './base-ark-survey.input';

@InputType()
export class SaveArkSurveyInput extends BaseArkSurveyInput {}
