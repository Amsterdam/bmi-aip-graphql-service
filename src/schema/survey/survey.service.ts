import { Injectable, NotFoundException } from '@nestjs/common';

import { SurveyRepository } from './survey.repository';
import { Survey } from './models/survey.model';
import { CreateSurveyInput } from './dto/create-survey.input';
import { SurveyFactory } from './survey.factory';

@Injectable()
export class SurveyService {
	public constructor(private readonly surveyRepo: SurveyRepository) {}

	async createSurvey(input: CreateSurveyInput): Promise<Survey> {
		return SurveyFactory.CreateSurvey(await this.surveyRepo.createSurvey(input));
	}

	async getSurvey(surveyId: string): Promise<Survey> {
		const survey = await this.surveyRepo.getSurveyById(surveyId);

		if (!survey) {
			throw new NotFoundException(`Unable to find survey with id: ${surveyId}`);
		}

		return SurveyFactory.CreateSurvey(survey);
	}

	async getSurveysByObjectId(objectId: string): Promise<Survey[]> {
		return (await this.surveyRepo.getSurveysByObjectId(objectId)).map((survey) =>
			SurveyFactory.CreateSurvey(survey),
		);
	}

	public async findInspectionStandardDataById(id: string): Promise<JSON> {
		const survey = await this.surveyRepo.getSurveyById(id);

		if (!survey) {
			throw new NotFoundException(`Unable to find survey with id: ${id}`);
		}

		return JSON.parse(JSON.stringify(survey.inspectionStandardData));
	}
}
