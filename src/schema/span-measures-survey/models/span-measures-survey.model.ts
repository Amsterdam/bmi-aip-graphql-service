import { Field, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

import { SurveyStates } from '../../survey/types/surveyStates';

import { SpanMeasuresInspectionStandardData } from './span-measures-inspection-standard-data.model';

@ObjectType({ description: 'spanMeasuresSurvey' })
export class SpanMeasuresSurvey {
	@Field((type) => String)
	id: string;

	@Field((type) => SpanMeasuresInspectionStandardData, { nullable: true })
	inspectionStandardData?: SpanMeasuresInspectionStandardData;

	@Field((type) => String, { nullable: true })
	verifiedAuthor?: string;

	@Field((type) => Date, { nullable: true })
	verifiedDate?: Date;

	@Field(() => SurveyStates)
	status: SurveyStates;
}
