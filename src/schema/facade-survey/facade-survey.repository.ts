import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import { FacadeSurvey, IFacadeSurveyRepository } from './types/facade-survey.repository.interface';
import { CreateFacadeSurveyInput } from './dto/create-facade-survey.input';
import { UpdateFacadeSurveyInput } from './dto/update-facade-survey.input';

@Injectable()
export class FacadeSurveyRepository implements IFacadeSurveyRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async createFacadeSurvey({
		surveyId,
		preparedAuthor,
		preparedDate,
		verifiedAuthor,
		verifiedDate,
		remarks,
	}: CreateFacadeSurveyInput): Promise<FacadeSurvey> {
		return this.prisma.facadeSurveys.create({
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
				remarks,
			},
		});
	}

	async updateFacadeSurvey({
		surveyId,
		preparedAuthor,
		preparedDate,
		verifiedAuthor,
		verifiedDate,
		remarks,
	}: UpdateFacadeSurveyInput): Promise<FacadeSurvey> {
		return this.prisma.facadeSurveys.update({
			where: {
				surveyId,
			},
			data: {
				preparedAuthor,
				preparedDate,
				verifiedAuthor,
				verifiedDate,
				remarks,
			},
		});
	}

	async deleteFacadeSurvey(surveyId: string): Promise<FacadeSurvey> {
		return this.prisma.facadeSurveys.delete({
			where: { surveyId: surveyId },
		});
	}

	// async getFacadeSurvey(surveyId: string): Promise<FacadeSurvey> {
	// 	const survey = (await this.prisma.facadeSurveys.findFirst({
	// 		where: { surveyId: surveyId },
	// 	})) as FacadeSurvey;

	// 	if (!survey) {
	// 		throw new Error('No ARK survey found.');
	// 	}

	// 	return survey;
	// }
}
