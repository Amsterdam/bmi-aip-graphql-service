import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Point } from 'geojson';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import { ArkSurvey, IArkSurveyRepository } from './types/ark-survey.repository.interface';
import { CreateArkSurveyInput } from './dto/create-ark-survey.input';
import { UpdateArkSurveyInput } from './dto/update-ark-survey.input';

@Injectable()
export class ArkSurveyRepository implements IArkSurveyRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async createArkSurvey({
		surveyId,
		ArkGeographyStart,
		ArkGeographyRDStart,
		ArkGeographyEnd,
		ArkGeographyRDEnd,
	}: CreateArkSurveyInput): Promise<ArkSurvey> {
		const data: Prisma.arkSurveysCreateInput = {
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

		const arkSurveyGeoRecord = await this.prisma.arkSurveys.create({ data });

		// Work around Prisma not supporting spatial data types
		if (ArkGeographyStart) {
			await this.prisma.$executeRaw`
				UPDATE "arkSurvey"
				SET "ArkGeographyStart" = ST_GeomFromGeoJSON(${JSON.stringify(ArkGeographyStart)})
				WHERE id = ${arkSurveyGeoRecord.id}
			`;
		}
		if (ArkGeographyEnd) {
			await this.prisma.$executeRaw`
				UPDATE "arkSurvey"
				SET "ArkGeographyEnd" = ST_GeomFromGeoJSON(${JSON.stringify(ArkGeographyEnd)})
				WHERE id = ${arkSurveyGeoRecord.id}
			`;
		}
		return {
			...arkSurveyGeoRecord,
			ArkGeographyStart,
			ArkGeographyEnd,
		};
	}

	async getArkSurveyData(surveyId: string): Promise<ArkSurvey[]> {
		const geographyDataResult = (await this.prisma.arkSurveys.findMany({
			where: {
				surveyId,
				deleted_at: null,
			},
		})) as ArkSurvey[];

		return Promise.all(
			geographyDataResult.map(async (result) => {
				result.ArkGeographyStart = await this.getGeographyAsGeoJSONStart(result.id);
				result.ArkGeographyEnd = await this.getGeographyAsGeoJSONEnd(result.id);
				return result;
			}),
		);
	}

	async updateArkSurvey({
		id,
		surveyId,
		ArkGeographyStart,
		ArkGeographyRDStart,
		ArkGeographyEnd,
		ArkGeographyRDEnd,
	}: UpdateArkSurveyInput): Promise<ArkSurvey> {
		const data: Prisma.arkSurveysUpdateInput = {
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

		// Work around Prisma not supporting spatial data types
		if (ArkGeographyStart) {
			await this.prisma.$executeRaw`
				UPDATE "arkSurveys"
				SET "ArkGeographyStart" = ST_GeomFromGeoJSON(${JSON.stringify(ArkGeographyStart)})
				WHERE id = ${id}
			`;
		}

		if (ArkGeographyEnd) {
			await this.prisma.$executeRaw`
				UPDATE "arkSurveys"
				SET "ArkGeographyEnd" = ST_GeomFromGeoJSON(${JSON.stringify(ArkGeographyEnd)})
				WHERE id = ${id}
			`;
		}

		const arkSurveyGeoData = await this.prisma.arkSurveys.update({
			where: { id },
			data,
		});

		// Work around Prisma not supporting spatial data types
		return {
			...arkSurveyGeoData,
			ArkGeographyStart: await this.getGeographyAsGeoJSONStart(id),
			ArkGeographyEnd: await this.getGeographyAsGeoJSONEnd(id),
		};
	}

	async deleteArkSurvey(identifier: string): Promise<ArkSurvey> {
		const data: Prisma.arkSurveysUpdateInput = {
			deleted_at: new Date(),
		};

		return this.prisma.arkSurveys.update({
			where: { id: identifier },
			data,
		});
	}

	async getGeographyAsGeoJSONStart(identifier: string): Promise<Point | null> {
		const result = await this.prisma.$queryRaw<{ geography?: Point | null }>`
			SELECT ST_AsGeoJSON("ArkGeographyStart") as geography
			FROM "arkSurveys"
			WHERE id = ${identifier};
		`;
		const geography = result?.[0]?.geography;
		return geography ? JSON.parse(geography) : null;
	}

	async getGeographyAsGeoJSONEnd(identifier: string): Promise<Point | null> {
		const result = await this.prisma.$queryRaw<{ geography?: Point | null }>`
			SELECT ST_AsGeoJSON("ArkGeographyEnd") as geography
			FROM "arkSurveys"
			WHERE id = ${identifier};
		`;
		const geography = result?.[0]?.geography;
		return geography ? JSON.parse(geography) : null;
	}
}
