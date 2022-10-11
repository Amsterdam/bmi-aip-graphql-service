import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { TensionWireSurvey } from '../models/tension-wire-survey.model';
import { TensionWireSurveyService } from '../tension-wire-survey.service';

import { GetTensionWireSurveyQuery } from './get-tension-wire-survey.query';

@QueryHandler(GetTensionWireSurveyQuery)
export class GetTensionWireSurveyHandler implements IQueryHandler<GetTensionWireSurveyQuery> {
	constructor(private service: TensionWireSurveyService) {}

	async execute(query: GetTensionWireSurveyQuery): Promise<TensionWireSurvey> {
		return this.service.getTensionWireSurvey(query.surveyId, query.supportSystemId);
	}
}
