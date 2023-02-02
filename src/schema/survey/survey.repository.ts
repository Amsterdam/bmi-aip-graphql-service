import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import { DbSurvey, ISurveyRepository } from './types/survey.repository.interface';
import { CreateSurveyInput } from './dto/create-survey.input';

@Injectable()
export class SurveyRepository implements ISurveyRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async createSurvey(input: CreateSurveyInput): Promise<DbSurvey> {
		const data: Prisma.surveysCreateInput = {
			id: newId(),
			description: input.description,
			condition: input.condition,
			inspectionStandardType: input.inspectionStandardType,
			objects: {
				connect: {
					id: input.objectId,
				},
			},
			status: input.status,
			surveryedOn: input.surveyedOn,
			updatedOn: input.updatedOn,
		};

		return this.prisma.surveys.create({ data });
	}

	async getSurveyById(surveyId: string): Promise<DbSurvey> {
		return this.prisma.surveys.findUnique({
			where: { id: surveyId },
		});
	}

	async getSurveysByObjectId(objectId: string): Promise<DbSurvey[]> {
		return this.prisma.surveys.findMany({
			where: { objectId: objectId },
		});
	}
}
