import { Injectable } from '@nestjs/common';

import { ArkSurveyGeographyDataFactory } from './ark-survey-geography-data.factory';
import { ArkSurveyGeographyDataRepository } from './ark-survey-geography-data.repository';
import { ArkSurveyGeographyData } from './models/ark-survey-geography-data.model';

@Injectable()
export class ArkSurveyGeographyDataService {
	public constructor(private readonly arkSurveyGeographyDataRepository: ArkSurveyGeographyDataRepository) {}

	async getGeographyData(surveyId: string): Promise<ArkSurveyGeographyData[]> {
		return (await this.arkSurveyGeographyDataRepository.getGeographyData(surveyId)).map((geographyData) =>
			ArkSurveyGeographyDataFactory.createArkSurveyGeographyData(geographyData),
		);
	}
}
