import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { ArkSurveyService } from '../ark-survey.service';
import { ArkSurvey } from '../models/ark-survey.model';

import { GetArkSurveyBySurveyIdQuery } from './get-ark-survey-by-survey.query';

@QueryHandler(GetArkSurveyBySurveyIdQuery)
export class GetArkSurveyBySurveyIdHandler implements IQueryHandler<GetArkSurveyBySurveyIdQuery> {
	constructor(private service: ArkSurveyService) {}

	async execute(query: GetArkSurveyBySurveyIdQuery): Promise<ArkSurvey> {
		return this.service.getArkSurvey(query.surveyId);
	}
}
