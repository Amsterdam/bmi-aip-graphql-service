import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Point } from 'geojson';

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
			ArkGeographyRDStart: {
				...ArkGeographyRDStart,
			},
			ArkGeographyRDEnd: {
				...ArkGeographyRDEnd,
			},
		};

		const arkSurveyGeoRecord = await this.prisma.arkSurveyGeographyData.create({ data });

		// Work around Prisma not supporting spatial data types
		if (ArkGeographyStart) {
			await this.prisma.$executeRaw`
				UPDATE "spanLuminaires"
				SET ArkGeographyStart = ST_GeomFromGeoJSON(${JSON.stringify(ArkGeographyStart)})
				WHERE id = ${arkSurveyGeoRecord.id}
			`;
		}
		if (ArkGeographyEnd) {
			await this.prisma.$executeRaw`
				UPDATE "spanLuminaires"
				SET ArkGeographyEnd = ST_GeomFromGeoJSON(${JSON.stringify(ArkGeographyEnd)})
				WHERE id = ${arkSurveyGeoRecord.id}
			`;
		}
		return {
			...arkSurveyGeoRecord,
			ArkGeographyStart,
			ArkGeographyEnd,
		};
	}

	async getGeographyData(surveyId: string): Promise<ArkSurveyGeographyData[]> {
		const geographyDataResult = (await this.prisma.arkSurveyGeographyData.findMany({
			where: {
				surveyId,
				deleted_at: null,
			},
		})) as ArkSurveyGeographyData[];

		return Promise.all(
			geographyDataResult.map(async (result) => {
				result.ArkGeographyStart = await this.getGeographyAsGeoJSON(result.id);
				result.ArkGeographyEnd = await this.getGeographyAsGeoJSON(result.id);
				return result;
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

	async getGeographyAsGeoJSON(identifier: string): Promise<Point | null> {
		const result = await this.prisma.$queryRaw<{ geography?: Point | null }>`
			SELECT ST_AsGeoJSON(geography) as geography
			FROM "spanJunctionBoxes"
			WHERE id = ${identifier};
		`;
		const geography = result?.[0]?.geography;
		return geography ? JSON.parse(geography) : null;
	}
}
