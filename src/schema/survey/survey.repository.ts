import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';

import { CreateSurveyInput } from './dto/create-survey.input';
import { DbSurvey, ISurveyRepository } from './types/survey.repository.interface';

@Injectable()
export class SurveyRepository implements ISurveyRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async createSurvey(input: CreateSurveyInput): Promise<DbSurvey> {
		const data: Prisma.surveysCreateInput = {
			id: input.id,
			surveryedOn: '',
			updatedOn: '',
			inspectionStandardType: input.inspectionStandardType,
			objects: {
				connect: {
					id: input.objectId,
				},
			},
		};
		return this.prisma.surveys.create({ data });
	}

	async getSurveyByObjectId(objectId: string): Promise<DbSurvey[]> {
		return this.prisma.surveys.findMany({
			where: {
				objectId,
			},
		});
	}
}
