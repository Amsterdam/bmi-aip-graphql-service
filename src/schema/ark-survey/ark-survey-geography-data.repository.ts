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

		const arkSurveyGeographyData = await this.prisma.arkSurveyGeographyData.create({ data });

		return {
			...arkSurveyGeographyData,
		};
	}

	async getGeographyData(surveyId: string): Promise<ArkSurveyGeographyData[]> {
		const arkSurveyGeographyDataResults = (await this.prisma.arkSurveyGeographyData.findMany({
			where: {
				surveyId,
				deleted_at: null,
			},
		})) as ArkSurveyGeographyData[];

		return Promise.all(
			arkSurveyGeographyDataResults.map(async (arkSurveyGeographyData) => {
				return arkSurveyGeographyData;
			}),
		);
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

		const arkSurveyGeographyData = await this.prisma.arkSurveyGeographyData.update({
			where: { id },
			data,
		});

		return arkSurveyGeographyData;
	}

	async deleteArkSurveyGeographyData(identifier: string): Promise<ArkSurveyGeographyData> {
		const data: Prisma.arkSurveyGeographyDataUpdateInput = {
			deleted_at: new Date(),
		};

		const arkSurveyGeographyData = await this.prisma.arkSurveyGeographyData.update({
			where: { id: identifier },
			data,
		});

		return arkSurveyGeographyData;
	}
}
