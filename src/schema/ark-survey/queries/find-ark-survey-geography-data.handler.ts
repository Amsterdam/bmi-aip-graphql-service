import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { ArkSurveyGeographyDataService } from '../ark-survey-geography-data.service';
import { ArkSurveyGeographyData } from '../models/ark-survey-geography-data.model';

import { FindArkSurveyGeographyDataQuery } from './find-ark-survey-geography-data.query';

@QueryHandler(FindArkSurveyGeographyDataQuery)
export class FindArkSurveyGeographyDataHandler implements IQueryHandler<FindArkSurveyGeographyDataQuery> {
	constructor(private service: ArkSurveyGeographyDataService) {}

	async execute(query: FindArkSurveyGeographyDataQuery): Promise<ArkSurveyGeographyData[]> {
		return this.service.getGeographyData(query.surveyId);
	}
}
