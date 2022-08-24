import { Injectable } from '@nestjs/common';

import { SurveyRepository } from './survey.repository';
import { Survey } from './models/survey.model';
import { CreateSurveyInput } from './dto/create-survey.input';

@Injectable()
export class SurveyService {
	public constructor(private readonly surveyRepo: SurveyRepository) {}

	async createSurvey(input: CreateSurveyInput): Promise<Survey> {
		return this.surveyRepo.createSurvey(input);
	}

	async getSurvey(surveyId: string): Promise<Survey> {
		return this.surveyRepo.getSurveyById(surveyId);
	}

	async getSurveysByObjectId(objectId: string): Promise<Survey[]> {
		return this.surveyRepo.getSurveysByObjectId(objectId);
	}
}
