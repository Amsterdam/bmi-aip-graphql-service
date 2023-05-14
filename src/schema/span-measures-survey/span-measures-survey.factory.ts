import { InspectionStandardDataFactory } from './inspection-standard-data.factory';
import { SpanMeasuresSurvey } from './models/span-measures-survey.model';
import { SpanMeasuresSurvey as DomainSpanMeasuresSurvey } from './types/span-measures-survey.repository.interface';

export class SpanMeasuresSurveyFactory {
	static CreateSpanMeasuresSurvey({ id, inspectionStandardData }: DomainSpanMeasuresSurvey): SpanMeasuresSurvey {
		const spanMeasuresSurvey = new SpanMeasuresSurvey();
		spanMeasuresSurvey.id = id;
		spanMeasuresSurvey.inspectionStandardData =
			InspectionStandardDataFactory.CreateInspectionStandardDataFromJSONB(inspectionStandardData);

		return spanMeasuresSurvey;
	}
}
