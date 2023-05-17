import { Field, ObjectType } from '@nestjs/graphql';

import { SpanMeasuresInspectionStandardData } from './span-measures-inspection-standard-data.model';

@ObjectType({ description: 'spanMeasuresSurvey' })
export class SpanMeasuresSurvey {
	@Field((type) => String)
	id: string;

	@Field((type) => SpanMeasuresInspectionStandardData, { nullable: true })
	inspectionStandardData?: SpanMeasuresInspectionStandardData;
}
