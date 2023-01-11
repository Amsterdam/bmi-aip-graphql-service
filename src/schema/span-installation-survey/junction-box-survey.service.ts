import { Injectable } from '@nestjs/common';

import { JunctionBoxSurveyRepository } from './junction-box-survey.repository';
import { JunctionBoxSurvey } from './models/junction-box-survey.model';
import { JunctionBoxSurveyFactory } from './junction-box-survey.factory';

@Injectable()
export class JunctionBoxSurveyService {
	public constructor(private readonly mastSurveyRepo: JunctionBoxSurveyRepository) {}

	async getJunctionBoxSurvey(supportSystemId: string): Promise<JunctionBoxSurvey> {
		return JunctionBoxSurveyFactory.CreateJunctionBoxSurvey(
			await this.mastSurveyRepo.getJunctionBoxSurvey(supportSystemId),
		);
	}
}
