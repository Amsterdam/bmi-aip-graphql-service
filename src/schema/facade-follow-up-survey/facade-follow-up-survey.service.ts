import { Injectable } from '@nestjs/common';

import { FacadeFollowUpSurveyFactory } from './facade-follow-up-survey.factory';
import { FacadeFollowUpSurveyRepository } from './facade-follow-up-survey.repository';
import { FacadeFollowUpSurvey } from './models/facade-follow-up-survey.model';

@Injectable()
export class FacadeFollowUpSurveyService {
	public constructor(private readonly facadeFollowUpSurveyRepository: FacadeFollowUpSurveyRepository) {}

	async getFacadeFollowUpSurvey(surveyId: string): Promise<FacadeFollowUpSurvey> {
		return FacadeFollowUpSurveyFactory.CreateFacadeFollowUpSurvey(
			await this.facadeFollowUpSurveyRepository.getFacadeFollowUpSurvey(surveyId),
		);
	}
}
