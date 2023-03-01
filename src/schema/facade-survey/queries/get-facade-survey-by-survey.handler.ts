import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { FacadeSurveyService } from '../facade-survey.service';
import { FacadeSurvey } from '../models/facade-survey.model';

import { GetFacadeSurveyBySurveyIdQuery } from './get-facade-survey-by-survey.query';

@QueryHandler(GetFacadeSurveyBySurveyIdQuery)
export class GetFacadeSurveyBySurveyIdHandler implements IQueryHandler<GetFacadeSurveyBySurveyIdQuery> {
	constructor(private service: FacadeSurveyService) {}

	async execute(query: GetFacadeSurveyBySurveyIdQuery): Promise<FacadeSurvey> {
		return this.service.getFacadeSurvey(query.surveyId);
	}
}
