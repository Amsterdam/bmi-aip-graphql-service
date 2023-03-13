import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma.service';
import { DbSurvey } from '../survey/types/survey.repository.interface';

import {
	FacadeFollowUpSurvey,
	IFacadeFollowUpSurveyRepository,
} from './types/facade-follow-up-survey.repository.interface';
import { UpdateFacadeFollowUpSurveyInput } from './dto/update-facade-follow-up-survey.input';

@Injectable()
export class FacadeFollowUpSurveyRepository implements IFacadeFollowUpSurveyRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async updateFacadeFollowUpSurvey({
		surveyId,
		preparedAuthor,
		preparedDate,
		verifiedAuthor,
		verifiedDate,
		inspectionStandardData,
	}: UpdateFacadeFollowUpSurveyInput): Promise<FacadeFollowUpSurvey> {
		// Find existing record in survey table
		const existingRecord = (await this.prisma.surveys.findFirst({
			where: { id: surveyId },
		})) as DbSurvey;

		//Update data in survey table
		if (existingRecord) {
			const survey = await this.prisma.surveys.update({
				where: {
					id: surveyId,
				},
				data: {
					preparedAuthor: preparedAuthor ? preparedAuthor : existingRecord.preparedAuthor,
					preparedDate: preparedDate ? preparedDate : existingRecord.preparedDate,
					verifiedAuthor: verifiedAuthor ? verifiedAuthor : existingRecord.verifiedAuthor,
					verifiedDate: verifiedDate ? verifiedDate : existingRecord.verifiedDate,
					inspectionStandardData: inspectionStandardData
						? (inspectionStandardData as Prisma.InputJsonObject)
						: existingRecord.inspectionStandardData,
				},
			});

			return survey;
		} else {
			if (!existingRecord) {
				throw new Error('No survey found.');
			}
		}
	}

	async getFacadeFollowUpSurvey(surveyId: string): Promise<FacadeFollowUpSurvey> {
		const survey = (await this.prisma.surveys.findFirst({
			where: { id: surveyId },
		})) as DbSurvey;

		if (!survey) {
			throw new Error('No survey found.');
		}

		return survey;
	}
}
