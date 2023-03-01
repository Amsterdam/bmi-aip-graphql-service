import { Injectable } from '@nestjs/common';

import { FacadeSurveyFactory } from './facade-survey.factory';
import { FacadeSurveyRepository } from './facade-survey.repository';
import { FacadeSurvey } from './models/facade-survey.model';

@Injectable()
export class FacadeSurveyService {
	public constructor(private readonly facadeSurveyRepository: FacadeSurveyRepository) {}

	async getFacadeSurvey(surveyId: string): Promise<FacadeSurvey> {
		return FacadeSurveyFactory.createFacadeSurvey(await this.facadeSurveyRepository.getFacadeSurvey(surveyId));
	}
}
