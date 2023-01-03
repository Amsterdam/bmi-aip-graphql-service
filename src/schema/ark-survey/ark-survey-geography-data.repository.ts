import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import {
	ArkSurveyGeographyData,
	IArkSurveyGeographyDataRepository,
} from './types/ark-survey-geography-data.repository.interface';
import { CreateArkSurveyGeographyDataInput } from './dto/create-ark-survey-geography-data.input';
import { UpdateArkSurveyGeographyDataInput } from './dto/update-ark-survey-geography-data.input';

@Injectable()
export class ArkSurveyGeographyDataRepository implements IArkSurveyGeographyDataRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async createArkSurveyGeographyData({
		surveyId,
		ArkGeographyStart,
		ArkGeographyRDStart,
		ArkGeographyEnd,
		ArkGeographyRDEnd,
	}: CreateArkSurveyGeographyDataInput): Promise<ArkSurveyGeographyData> {
		const data: Prisma.arkSurveyGeographyDataCreateInput = {
			id: newId(),
			surveys: {
				connect: {
					id: surveyId,
				},
			},
			ArkGeographyStart: {
				...ArkGeographyStart,
			},
			ArkGeographyRDStart: {
				...ArkGeographyRDStart,
			},
			ArkGeographyEnd: {
				...ArkGeographyEnd,
			},
			ArkGeographyRDEnd: {
				...ArkGeographyRDEnd,
			},
		};

		return this.prisma.arkSurveyGeographyData.create({ data });
	}

	async getGeographyData(surveyId: string): Promise<ArkSurveyGeographyData[]> {
		return this.prisma.arkSurveyGeographyData.findMany({
			where: {
				surveyId,
				deleted_at: null,
			},
		});
	}

	async updateArkSurveyGeographyData({
		id,
		surveyId,
		ArkGeographyStart,
		ArkGeographyRDStart,
		ArkGeographyEnd,
		ArkGeographyRDEnd,
	}: UpdateArkSurveyGeographyDataInput): Promise<ArkSurveyGeographyData> {
		const data: Prisma.arkSurveyGeographyDataUpdateInput = {
			surveys: {
				connect: {
					id: surveyId,
				},
			},
			ArkGeographyStart: {
				...ArkGeographyStart,
			},
			ArkGeographyEnd: {
				...ArkGeographyEnd,
			},
			ArkGeographyRDStart: {
				...ArkGeographyRDStart,
			},
			ArkGeographyRDEnd: {
				...ArkGeographyRDEnd,
			},
		};

		return this.prisma.arkSurveyGeographyData.update({
			where: { id },
			data,
		});
	}

	async deleteArkSurveyGeographyData(identifier: string): Promise<ArkSurveyGeographyData> {
		const data: Prisma.arkSurveyGeographyDataUpdateInput = {
			deleted_at: new Date(),
		};

		return this.prisma.arkSurveyGeographyData.update({
			where: { id: identifier },
			data,
		});
	}
}
