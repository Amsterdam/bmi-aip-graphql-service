import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import {
	FacadeFollowUpSurvey,
	IFacadeFollowUpSurveyRepository,
} from './types/facade-follow-up-survey.repository.interface';
import { SaveFacadeFollowUpSurveyInput } from './dto/save-facade-follow-up-survey.input';

@Injectable()
export class FacadeFollowUpSurveyRepository implements IFacadeFollowUpSurveyRepository {
	public constructor(private readonly prisma: PrismaService) {}

	// combine create and save
	async saveFacadeFollowUpSurvey({
		surveyId,
		preparedAuthor,
		preparedDate,
		verifiedAuthor,
		verifiedDate,
		remarks,
	}: SaveFacadeFollowUpSurveyInput): Promise<FacadeFollowUpSurvey> {
		// Find existing record
		const existingRecord = await this.prisma.facadeFollowUpSurveys.findFirst({
			where: {
				surveyId,
			},
		});

		const insertData = {
			surveyId,
			preparedAuthor,
			preparedDate,
			verifiedAuthor,
			verifiedDate,
			remarks,
			created_at: null,
			updated_at: null,
			deleted_at: null,
		};

		// Update inspectionStandardData field in survey table
		if (insertData.remarks) {
			await this.prisma.surveys.update({
				where: {
					id: existingRecord.surveyId,
				},
				data: {
					inspectionStandardData: JSON.parse(JSON.stringify(remarks)),
				},
			});
		} else {
			await this.prisma.surveys.update({
				where: {
					id: existingRecord.surveyId,
				},
				data: {
					inspectionStandardData: JSON.parse(''),
				},
			});
		}

		// Update or Create facade follow up survey
		if (existingRecord) {
			return this.updateFacadeFollowUpSurvey(insertData);
		} else {
			// Workaround to make sure created reachSegments are included in response
			// const updated = await this.updateFacadeFollowUpSurvey(insertData);

			return this.createFacadeFollowUpSurvey(insertData);
		}
	}

	async createFacadeFollowUpSurvey({
		surveyId,
		preparedAuthor,
		preparedDate,
		verifiedAuthor,
		verifiedDate,
	}: SaveFacadeFollowUpSurveyInput): Promise<FacadeFollowUpSurvey> {
		return this.prisma.facadeFollowUpSurveys.create({
			data: {
				id: newId(),
				surveys: {
					connect: {
						id: surveyId,
					},
				},
				preparedAuthor,
				preparedDate,
				verifiedAuthor,
				verifiedDate,
			},
		});
	}

	async updateFacadeFollowUpSurvey({
		surveyId,
		preparedAuthor,
		preparedDate,
		verifiedAuthor,
		verifiedDate,
	}: SaveFacadeFollowUpSurveyInput): Promise<FacadeFollowUpSurvey> {
		return this.prisma.facadeFollowUpSurveys.update({
			where: {
				surveyId,
			},
			data: {
				preparedAuthor,
				preparedDate,
				verifiedAuthor,
				verifiedDate,
			},
		});
	}

	async deleteFacadeFollowUpSurvey(surveyId: string): Promise<FacadeFollowUpSurvey> {
		//Remove inspectionStandardData field in survey table
		await this.prisma.surveys.update({
			where: {
				id: surveyId,
			},
			data: {
				inspectionStandardData: JSON.parse(''),
			},
		});

		// Remove facade follow up survey
		return this.prisma.facadeFollowUpSurveys.delete({
			where: { surveyId: surveyId },
		});
	}

	async getFacadeFollowUpSurvey(surveyId: string): Promise<FacadeFollowUpSurvey> {
		const survey = (await this.prisma.facadeFollowUpSurveys.findFirst({
			where: { surveyId: surveyId },
		})) as FacadeFollowUpSurvey;

		if (!survey) {
			throw new Error('No ARK survey found.');
		}

		return survey;
	}
}
