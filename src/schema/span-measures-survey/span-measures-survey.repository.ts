import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma.service';
import { DbSurvey } from '../survey/types/survey.repository.interface';

import { UpdateSpanMeasuresSurveyInput } from './dto/update-span-measures-survey.input';
import { SpanMeasuresSurvey, ISpanMeasuresSurveyRepository } from './types/span-measures-survey.repository.interface';

@Injectable()
export class SpanMeasuresSurveyRepository implements ISpanMeasuresSurveyRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async updateSpanMeasuresSurvey({
		surveyId,
		inspectionStandardData,
	}: UpdateSpanMeasuresSurveyInput): Promise<SpanMeasuresSurvey> {
		// Find existing record in survey table
		const existingRecord = await this.prisma.surveys.findFirst({
			where: { id: surveyId },
		});

		if (!existingRecord) throw new Error('No survey found.');

		//Update data in survey table
		return this.prisma.surveys.update({
			where: {
				id: surveyId,
			},
			data: {
				inspectionStandardData: inspectionStandardData as Prisma.InputJsonObject,
			},
		});
	}

	async updateSpanMeasuresCompletion({
		surveyId,
		preparedAuthor,
		preparedDate,
		verifiedAuthor,
		verifiedDate,
		inspectionStandardData,
	}: UpdateSpanMeasuresSurveyInput): Promise<SpanMeasuresSurvey> {
		// Find existing record in survey table
		const existingRecord = await this.prisma.surveys.findFirst({ where: { id: surveyId } });

		if (!existingRecord) throw new Error('No survey found.');

		//Update data in survey table
		return this.prisma.surveys.update({
			where: {
				id: surveyId,
			},
			data: {
				preparedAuthor,
				preparedDate,
				verifiedAuthor,
				verifiedDate,
				inspectionStandardData: inspectionStandardData as Prisma.InputJsonObject,
			},
		});
	}

	async getSpanMeasuresSurvey(surveyId: string): Promise<SpanMeasuresSurvey> {
		const survey = (await this.prisma.surveys.findFirst({
			where: { id: surveyId },
		})) as DbSurvey;

		if (!survey) {
			throw new Error('No survey found.');
		}

		return survey;
	}
}
