import { Injectable } from '@nestjs/common';

import { MastSurveyRepository } from './mast-survey.repository';
import { MastSurvey } from './models/mast-survey.model';
import { MastSurveyFactory } from './mast-survey.factory';

@Injectable()
export class MastSurveyService {
	public constructor(private readonly mastSurveyRepo: MastSurveyRepository) {}

	async getMastSurvey(supportSystemId: string): Promise<MastSurvey> {
		return MastSurveyFactory.CreateMastSurvey(await this.mastSurveyRepo.getMastSurvey(supportSystemId));
	}

	async getMastSurveyOnPermanentId(supportSystemId: string): Promise<MastSurvey> {
		return MastSurveyFactory.CreateMastSurvey(
			await this.mastSurveyRepo.getMastSurveyOnPermanentId(supportSystemId),
		);
	}

	async hasDamage(supportSystemId: string): Promise<boolean> {
		return this.mastSurveyRepo.hasDamage(supportSystemId);
	}
}
