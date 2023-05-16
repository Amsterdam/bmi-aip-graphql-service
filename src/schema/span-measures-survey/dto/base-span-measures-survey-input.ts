import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsUUID } from 'class-validator';

import { SpanMeasuresInspectionStandardDataInput } from './span-measures-inspection-standard-data.input';

@InputType()
export class BaseSpanMeasuresSurveyInput {
	@Field((type) => String)
	@IsUUID()
	public surveyId: string;

	@IsOptional()
	@Field((type) => SpanMeasuresInspectionStandardDataInput, { nullable: true })
	public inspectionStandardData?: SpanMeasuresInspectionStandardDataInput;
}
