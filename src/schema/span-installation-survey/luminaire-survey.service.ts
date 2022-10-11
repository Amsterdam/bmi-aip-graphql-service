import { Injectable } from '@nestjs/common';

import { LuminaireSurveyRepository } from './luminaire-survey.repository';
import { LuminaireSurvey } from './models/luminaire-survey.model';
import { LuminaireSurveyFactory } from './luminaire-survey.factory';

@Injectable()
export class LuminaireSurveyService {
	public constructor(private readonly luminaireSurveyRepo: LuminaireSurveyRepository) {}

	async getLuminaireSurvey(luminaireId: string): Promise<LuminaireSurvey> {
		return LuminaireSurveyFactory.CreateLuminaireSurvey(
			await this.luminaireSurveyRepo.getLuminaireSurvey(luminaireId),
		);
	}
}
