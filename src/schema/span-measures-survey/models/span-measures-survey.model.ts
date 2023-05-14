import { Field, ObjectType } from '@nestjs/graphql';

import { InspectionStandardData } from './inspection-standard-data.models';

@ObjectType({ description: 'spanMeasuresSurvey' })
export class SpanMeasuresSurvey {
	@Field((type) => String)
	id: string;

	@Field((type) => InspectionStandardData, { nullable: true })
	inspectionStandardData?: InspectionStandardData;
}
