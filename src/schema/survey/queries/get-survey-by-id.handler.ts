import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Survey } from '../models/survey.model';
import { SurveyService } from '../survey.service';

import { GetSurveyByIdQuery } from './get-survey-by-id.query';

@QueryHandler(GetSurveyByIdQuery)
export class GetSurveyByIdHandler implements IQueryHandler<GetSurveyByIdQuery> {
	constructor(private repository: SurveyService) {}

	public async execute(command: GetSurveyByIdQuery): Promise<Survey> {
		return this.repository.getSurvey(command.surveyId);
	}
}
