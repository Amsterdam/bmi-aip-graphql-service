import { Injectable } from '@nestjs/common';

import { ArkSurveyFactory } from './ark-survey.factory';
import { ArkSurveyRepository } from './ark-survey.repository';
import { ArkSurvey } from './models/ark-survey.model';

@Injectable()
export class ArkSurveyService {
	public constructor(private readonly arkSurveyRepository: ArkSurveyRepository) {}

	async getArkSurvey(surveyId: string): Promise<ArkSurvey> {
		return ArkSurveyFactory.createArkSurvey(await this.arkSurveyRepository.getArkSurvey(surveyId));
	}

	async findArkSurveysByAssetCode(assetCode: string): Promise<ArkSurvey[]> {
		const arkSurveys = await this.arkSurveyRepository.findArkSurveysByAssetCode(assetCode);

		console.log(arkSurveys);

		return arkSurveys.map((arkSurvey: any) => ArkSurveyFactory.createArkSurveyWithReachSegments(arkSurvey));
	}
}
