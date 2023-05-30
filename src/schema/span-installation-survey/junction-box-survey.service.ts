import { Injectable } from '@nestjs/common';

import { JunctionBoxSurveyRepository } from './junction-box-survey.repository';
import { JunctionBoxSurvey } from './models/junction-box-survey.model';
import { JunctionBoxSurveyFactory } from './junction-box-survey.factory';

@Injectable()
export class JunctionBoxSurveyService {
	public constructor(private readonly junctionBoxRepo: JunctionBoxSurveyRepository) {}

	async getJunctionBoxSurvey(junctionBoxId: string): Promise<JunctionBoxSurvey> {
		return JunctionBoxSurveyFactory.CreateJunctionBoxSurvey(
			await this.junctionBoxRepo.getJunctionBoxSurvey(junctionBoxId),
		);
	}

	async getJunctionBoxSurveyOnPermanentId(junctionBoxId: string): Promise<JunctionBoxSurvey> {
		return JunctionBoxSurveyFactory.CreateJunctionBoxSurvey(
			await this.junctionBoxRepo.getJunctionBoxSurveyOnPermanentId(junctionBoxId),
		);
	}
}
