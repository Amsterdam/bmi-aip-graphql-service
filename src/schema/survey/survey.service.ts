import { Injectable } from '@nestjs/common';

import { CreateSurveyInput } from './dto/create-survey.input';
import { SurveyRepository } from './survey.repository';
import { SurveyFactory } from './survey.factory';
import { Survey } from './models/survey.model';

@Injectable()
export class SurveyService {
	public constructor(private readonly surveyRepo: SurveyRepository) {}

	async createSurvey(input: CreateSurveyInput): Promise<Survey> {
		return SurveyFactory.CreateSurvey(input);
	}

	async getSurveys(objectId: string): Promise<Survey[]> {
		return (await this.surveyRepo.getSurveyByObjectId(objectId)).map((survey) =>
			SurveyFactory.CreateSurvey(survey),
		);
	}
}
