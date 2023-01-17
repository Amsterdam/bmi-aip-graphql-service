import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Point } from 'geojson';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';
import { ReachSegmentFactory } from '../reach-segment/reach-segment.factory';

import { ArkSurvey, IArkSurveyRepository } from './types/ark-survey.repository.interface';
import { CreateArkSurveyInput } from './dto/create-ark-survey.input';
import { UpdateArkSurveyInput } from './dto/update-ark-survey.input';

@Injectable()
export class ArkSurveyRepository implements IArkSurveyRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async createArkSurvey({
		surveyId,
		arkGeographyStart,
		arkGeographyRDStart,
		arkGeographyEnd,
		arkGeographyRDEnd,
	}: CreateArkSurveyInput): Promise<ArkSurvey> {
		const data: Prisma.arkSurveysCreateInput = {
			id: newId(),
			surveys: {
				connect: {
					id: surveyId,
				},
			},
			arkGeographyRDStart: {
				...arkGeographyRDStart,
			},
			arkGeographyRDEnd: {
				...arkGeographyRDEnd,
			},
		};

		const arkSurveyGeoRecord = await this.prisma.arkSurveys.create({ data });

		// Work around Prisma not supporting spatial data types
		if (arkGeographyStart) {
			await this.prisma.$executeRaw`
				UPDATE "arkSurveys"
				SET "arkGeographyStart" = ST_GeomFromGeoJSON(${JSON.stringify(arkGeographyStart)})
				WHERE "surveyId" = ${arkSurveyGeoRecord.id}
			`;
		}
		if (arkGeographyEnd) {
			await this.prisma.$executeRaw`
				UPDATE "arkSurveys"
				SET "arkGeographyEnd" = ST_GeomFromGeoJSON(${JSON.stringify(arkGeographyEnd)})
				WHERE "surveyId" = ${arkSurveyGeoRecord.id}
			`;
		}

		return {
			...arkSurveyGeoRecord,
			arkGeographyStart,
			arkGeographyEnd,
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
				result.arkGeographyStart = await this.getGeographyAsGeoJSONStart(result.surveyId);
				result.arkGeographyEnd = await this.getGeographyAsGeoJSONEnd(result.surveyId);
				return result;
			}),
		);
	}

	async updateArkSurvey({
		surveyId,
		arkGeographyStart,
		arkGeographyRDStart,
		arkGeographyEnd,
		arkGeographyRDEnd,
	}: UpdateArkSurveyInput): Promise<ArkSurvey> {
		const data: Prisma.arkSurveysUpdateInput = {
			arkGeographyRDStart: {
				...arkGeographyRDStart,
			},
			arkGeographyRDEnd: {
				...arkGeographyRDEnd,
			},
		};

		// Work around Prisma not supporting spatial data types
		if (arkGeographyStart) {
			await this.prisma.$executeRaw`
				UPDATE "arkSurveys"
				SET "arkGeographyStart" = ST_GeomFromGeoJSON(${JSON.stringify(arkGeographyStart)})
				WHERE "surveyId" = ${surveyId}
			`;
		}

		if (arkGeographyEnd) {
			await this.prisma.$executeRaw`
				UPDATE "arkSurveys"
				SET "arkGeographyEnd" = ST_GeomFromGeoJSON(${JSON.stringify(arkGeographyEnd)})
				WHERE "surveyId" = ${surveyId}
			`;
		}

		const arkSurveyGeoData = await this.prisma.arkSurveys.update({
			where: { surveyId },
			data,
		});

		// Work around Prisma not supporting spatial data types
		return {
			...arkSurveyGeoData,
			arkGeographyStart: await this.getGeographyAsGeoJSONStart(surveyId),
			arkGeographyEnd: await this.getGeographyAsGeoJSONEnd(surveyId),
		};
	}

	async saveArkSurvey({
		surveyId,
		arkGeographyStart,
		arkGeographyRDStart,
		arkGeographyEnd,
		arkGeographyRDEnd,
		reachSegments,
	}: UpdateArkSurveyInput): Promise<ArkSurvey> {
		// Find existing record
		const existingRecord = await this.prisma.arkSurveys.findFirst({
			where: {
				surveyId,
				deleted_at: null,
			},
		});

		const insertData = {
			surveyId,
			arkGeographyStart,
			arkGeographyRDStart,
			arkGeographyEnd,
			arkGeographyRDEnd,
			reachSegments,
			created_at: null,
			updated_at: null,
			deleted_at: null,
		};

		if (existingRecord) {
			// Delete existing reach segments
			await this.prisma.arkSurveyReachSegments.deleteMany({
				where: {
					arkSurveyId: existingRecord.id,
				},
			});

			// Create new reach segments
			const reachSegmentsFormatted = ReachSegmentFactory.CreateReachSegmentsFromJson(
				insertData.reachSegments,
				existingRecord.id,
			);

			await this.prisma.arkSurveyReachSegments.createMany({
				data: reachSegmentsFormatted,
			});

			return this.updateArkSurvey(insertData);
		} else {
			const newRecord = await this.createArkSurvey(insertData);
			const reachSegmentsFormatted = ReachSegmentFactory.CreateReachSegmentsFromJson(
				insertData.reachSegments,
				newRecord.id,
			);

			await this.prisma.arkSurveyReachSegments.createMany({
				data: reachSegmentsFormatted,
			});

			// Workaround to make sure created reachSegments are included in response
			const updated = await this.updateArkSurvey(insertData);

			return updated;
		}
	}

	async deleteArkSurvey(identifier: string): Promise<ArkSurvey> {
		return this.prisma.arkSurveys.delete({
			where: { id: identifier },
		});
	}

	async getGeographyAsGeoJSONStart(identifier: string): Promise<Point | null> {
		const result = await this.prisma.$queryRaw<{ geography?: Point | null }>`
			SELECT ST_AsGeoJSON("arkGeographyStart") as geography
			FROM "arkSurveys"
			WHERE "surveyId" = ${identifier};
		`;

		const geography = result?.[0]?.geography;
		return geography ? JSON.parse(geography) : null;
	}

	async getGeographyAsGeoJSONEnd(identifier: string): Promise<Point | null> {
		const result = await this.prisma.$queryRaw<{ geography?: Point | null }>`
			SELECT ST_AsGeoJSON("arkGeographyEnd") as geography
			FROM "arkSurveys"
			WHERE "surveyId" = ${identifier};
		`;

		const geography = result?.[0]?.geography;
		return geography ? JSON.parse(geography) : null;
	}

	async hasReachSegments(identifier: string): Promise<boolean> {
		const segmentCount = await this.prisma.arkSurveyReachSegments.count({
			where: {
				arkSurveyId: identifier,
				deleted_at: null,
			},
		});
		return !!segmentCount;
	}
}
