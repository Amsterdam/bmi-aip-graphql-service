import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { JunctionBoxSurvey } from '../models/junction-box-survey.model';
import { JunctionBoxSurveyService } from '../junction-box-survey.service';

import { GetJunctionBoxSurveyQuery } from './get-junction-box-survey.query';

@QueryHandler(GetJunctionBoxSurveyQuery)
export class GetJunctionBoxSurveyHandler implements IQueryHandler<GetJunctionBoxSurveyQuery> {
	constructor(private service: JunctionBoxSurveyService) {}

	async execute(query: GetJunctionBoxSurveyQuery): Promise<JunctionBoxSurvey> {
		return this.service.getJunctionBoxSurvey(query.surveyId, query.junctionBoxId);
	}
}
