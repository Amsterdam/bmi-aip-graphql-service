import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { ArkSurveyService } from '../ark-survey.service';
import { ArkSurvey } from '../models/ark-survey.model';

import { FindArkSurveyQuery } from './find-ark-survey.query';

@QueryHandler(FindArkSurveyQuery)
export class FindArkSurveyHandler implements IQueryHandler<FindArkSurveyQuery> {
	constructor(private service: ArkSurveyService) {}

	async execute(query: FindArkSurveyQuery): Promise<ArkSurvey> {
		return this.service.getArkSurveyData(query.surveyId);
	}
}
