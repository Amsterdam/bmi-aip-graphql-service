import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import { DbSurvey, ISurveyRepository } from './types/survey.repository.interface';
import { CreateSurveyInput } from './dto/create-survey.input';
import { SurveyStates } from './types/surveyStates';

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

	async getSurveyByBatchId(batchId: string, inspectionStandardType: string): Promise<DbSurvey[]> {
		return this.prisma.surveys.findMany({
			where: {
				batchId: batchId,
				inspectionStandardType: inspectionStandardType,
				NOT: { status: SurveyStates.deleted },
			},
		});
	}

	async getSurveysByObjectId(objectId: string): Promise<DbSurvey[]> {
		return this.prisma.surveys.findMany({
			where: { objectId: objectId },
		});
	}

	async getNen2767OrFmecaSurveyByObjectId(objectId: string): Promise<DbSurvey> {
		return this.prisma.surveys.findFirst({
			where: {
				objectId: objectId,
				inspectionStandardType: {
					in: ['nen2767', 'fmeca'],
				},
				NOT: { status: SurveyStates.deleted },
			},
			orderBy: {
				created_at: 'desc',
			},
		});
	}

	public async findIdPreviousNen2767OrFmecaSurvey(surveyId: string): Promise<string | null> {
		const current = await this.prisma.surveys.findFirst({
			where: {
				id: surveyId,
			},

			select: {
				id: true,
				objectId: true,
				inspectionStandardType: true,
			},
		});

		const previous = await this.prisma.surveys.findFirst({
			where: {
				objectId: current.objectId,
				inspectionStandardType: {
					in: ['nen2767', 'fmeca'],
				},
				NOT: [{ id: current.id }, { status: SurveyStates.deleted }],
			},
			orderBy: {
				created_at: 'desc',
			},
			select: {
				id: true,
			},
		});

		return previous?.id;
	}

	public async findOVSSurveyIdBySpanObject(objectId: string): Promise<string | null> {
		const survey = await this.prisma.surveys.findFirst({
			where: {
				objectId: objectId,
				inspectionStandardType: 'spanInstallation',
				NOT: [{ status: SurveyStates.deleted }],
			},
			orderBy: {
				created_at: 'desc',
			},
			select: {
				id: true,
			},
		});

		return survey.id;
	}
}
