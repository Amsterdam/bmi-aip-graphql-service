import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { FacadeFollowUpSurveyService } from '../facade-follow-up-survey.service';
import { FacadeFollowUpSurvey } from '../models/facade-follow-up-survey.model';

import { GetFacadeFollowUpSurveyBySurveyIdQuery } from './get-facade-follow-up-survey-by-survey.query';

@QueryHandler(GetFacadeFollowUpSurveyBySurveyIdQuery)
export class GetFacadeFollowUpSurveyBySurveyIdHandler implements IQueryHandler<GetFacadeFollowUpSurveyBySurveyIdQuery> {
	constructor(private service: FacadeFollowUpSurveyService) {}

	async execute(query: GetFacadeFollowUpSurveyBySurveyIdQuery): Promise<FacadeFollowUpSurvey> {
		return this.service.getFacadeFollowUpSurvey(query.surveyId);
	}
}
