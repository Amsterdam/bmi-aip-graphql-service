import { InputType } from '@nestjs/graphql';

import { BaseSpanMeasuresSurveyInput } from './base-span-measures-survey-input';

@InputType()
export class UpdateSpanMeasuresSurveyInput extends BaseSpanMeasuresSurveyInput {}
