import { Injectable } from '@nestjs/common';

import { TensionWireSurveyRepository } from './tension-wire-survey.repository';
import { TensionWireSurvey } from './models/tension-wire-survey.model';
import { TensionWireSurveyFactory } from './tension-wire-survey.factory';

@Injectable()
export class TensionWireSurveyService {
	public constructor(private readonly tensionWireSurveyRepo: TensionWireSurveyRepository) {}

	async getTensionWireSurvey(supportSystemId: string): Promise<TensionWireSurvey> {
		return TensionWireSurveyFactory.CreateTensionWireSurvey(
			await this.tensionWireSurveyRepo.getTensionWireSurvey(supportSystemId),
		);
	}
}
