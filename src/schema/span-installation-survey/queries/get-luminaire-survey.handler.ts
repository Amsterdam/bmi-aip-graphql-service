import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { LuminaireSurvey } from '../models/luminaire-survey.model';
import { LuminaireSurveyService } from '../luminaire-survey.service';

import { GetLuminaireSurveyQuery } from './get-luminaire-survey.query';

@QueryHandler(GetLuminaireSurveyQuery)
export class GetLuminaireSurveyHandler implements IQueryHandler<GetLuminaireSurveyQuery> {
	constructor(private service: LuminaireSurveyService) {}

	async execute(query: GetLuminaireSurveyQuery): Promise<LuminaireSurvey> {
		return this.service.getLuminaireSurvey(query.luminaireId);
	}
}
