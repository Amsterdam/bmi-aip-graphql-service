import { Injectable, NotFoundException } from '@nestjs/common';

import { SurveyRepository } from './survey.repository';
import { Survey } from './models/survey.model';
import { CreateSurveyInput } from './dto/create-survey.input';
import { SurveyFactory } from './survey.factory';
import { SurveyDataFieldType } from './types/surveyDataFieldType';

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

	public async findPreparedAuthorById(id: string): Promise<string> {
		const survey = await this.surveyRepo.getSurveyById(id);

		if (!survey) {
			throw new NotFoundException(`Unable to find survey with id: ${id}`);
		}

		return survey.preparedAuthor;
	}

	public async findPreparedDateById(id: string): Promise<Date> {
		const survey = await this.surveyRepo.getSurveyById(id);

		if (!survey) {
			throw new NotFoundException(`Unable to find survey with id: ${id}`);
		}

		return survey.preparedDate;
	}

	public async findVerifiedAuthorById(id: string): Promise<string> {
		const survey = await this.surveyRepo.getSurveyById(id);

		if (!survey) {
			throw new NotFoundException(`Unable to find survey with id: ${id}`);
		}

		return survey.verifiedAuthor;
	}

	public async findVerifiedDateById(id: string): Promise<Date> {
		const survey = await this.surveyRepo.getSurveyById(id);

		if (!survey) {
			throw new NotFoundException(`Unable to find survey with id: ${id}`);
		}

		return survey.verifiedDate;
	}

	public async findSurveyDataByFieldAndId(id: string, field: SurveyDataFieldType): Promise<any> {
		const survey = await this.surveyRepo.getSurveyById(id);

		if (!survey) {
			throw new NotFoundException(`Unable to find survey with id: ${id}`);
		}

		return survey[`${field}`];
	}
}
