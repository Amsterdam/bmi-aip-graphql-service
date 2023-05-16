import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { SpanMeasuresSurvey } from '../models/span-measures-survey.model';
import { SpanMeasuresSurveyService } from '../span-measures-survey.service';

import { GetSpanMeasuresSurveyBySurveyIdQuery } from './get-span-measures-survey-by-survey.query';

@QueryHandler(GetSpanMeasuresSurveyBySurveyIdQuery)
export class GetSpanMeasuresSurveyBySurveyIdHandler implements IQueryHandler<GetSpanMeasuresSurveyBySurveyIdQuery> {
	constructor(private service: SpanMeasuresSurveyService) {}

	async execute(query: GetSpanMeasuresSurveyBySurveyIdQuery): Promise<SpanMeasuresSurvey> {
		return this.service.getSpanMeasuresSurvey(query.surveyId);
	}
}
