import { Injectable } from '@nestjs/common';

import { FacadeSurveyRepository } from './facade-survey.repository';
import { FacadeSurvey } from './models/facade-survey.model';
import { FacadeSurveyFactory } from './facade-survey.factory';

@Injectable()
export class FacadeSurveyService {
	public constructor(private readonly facadeSurveyRepo: FacadeSurveyRepository) {}

	async getFacadeSurvey(surveyId: string, supportSystemId: string): Promise<FacadeSurvey> {
		return FacadeSurveyFactory.CreateFacadeSurvey(
			await this.facadeSurveyRepo.getFacadeSurvey(surveyId, supportSystemId),
		);
	}
}
