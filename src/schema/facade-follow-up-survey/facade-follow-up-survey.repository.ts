import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import {
	FacadeFollowUpSurvey,
	IFacadeFollowUpSurveyRepository,
} from './types/facade-follow-up-survey.repository.interface';
import { CreateFacadeFollowUpSurveyInput } from './dto/create-facade-follow-up-survey.input';
import { UpdateFacadeFollowUpSurveyInput } from './dto/update-facade-follow-up-survey.input';

@Injectable()
export class FacadeFollowUpSurveyRepository implements IFacadeFollowUpSurveyRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async createFacadeFollowUpSurvey({
		surveyId,
		preparedAuthor,
		preparedDate,
		verifiedAuthor,
		verifiedDate,
	}: CreateFacadeFollowUpSurveyInput): Promise<FacadeFollowUpSurvey> {
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
	}: UpdateFacadeFollowUpSurveyInput): Promise<FacadeFollowUpSurvey> {
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
