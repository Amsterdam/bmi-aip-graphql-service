import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { FacadeSurvey } from '../models/facade-survey.model';
import { FacadeSurveyService } from '../facade-survey.service';

import { GetFacadeSurveyQuery } from './get-facade-survey.query';

@QueryHandler(GetFacadeSurveyQuery)
export class GetFacadeSurveyHandler implements IQueryHandler<GetFacadeSurveyQuery> {
	constructor(private service: FacadeSurveyService) {}

	async execute(query: GetFacadeSurveyQuery): Promise<FacadeSurvey> {
		return this.service.getFacadeSurvey(query.surveyId, query.supportSystemId);
	}
}
