import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { MastSurvey } from '../models/mast-survey.model';
import { MastSurveyService } from '../mast-survey.service';

import { GetMastSurveyQuery } from './get-mast-survey.query';

@QueryHandler(GetMastSurveyQuery)
export class GetMastSurveyHandler implements IQueryHandler<GetMastSurveyQuery> {
	constructor(private service: MastSurveyService) {}

	async execute(query: GetMastSurveyQuery): Promise<MastSurvey> {
		return this.service.getMastSurvey(query.supportSystemId);
	}
}
