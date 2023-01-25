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

		const arkSurveyRecord = await this.prisma.arkSurveys.create({ data });

		// Work around Prisma not supporting spatial data types
		if (arkGeographyStart) {
			await this.prisma.$executeRaw`
				UPDATE "arkSurveys"
				SET "arkGeographyStart" = ST_GeomFromGeoJSON(${JSON.stringify(arkGeographyStart)})
				WHERE "surveyId" = ${arkSurveyRecord.id}
			`;
		}
		if (arkGeographyEnd) {
			await this.prisma.$executeRaw`
				UPDATE "arkSurveys"
				SET "arkGeographyEnd" = ST_GeomFromGeoJSON(${JSON.stringify(arkGeographyEnd)})
				WHERE "surveyId" = ${arkSurveyRecord.id}
			`;
		}

		return {
			...arkSurveyRecord,
			arkGeographyStart,
			arkGeographyEnd,
		};
	}

	async getArkSurvey(surveyId: string): Promise<ArkSurvey> {
		const survey = (await this.prisma.arkSurveys.findFirst({
			where: { surveyId: surveyId },
		})) as ArkSurvey;

		survey.arkGeographyStart = await this.getGeographyAsGeoJSONStart(survey.surveyId);
		survey.arkGeographyEnd = await this.getGeographyAsGeoJSONEnd(survey.surveyId);

		if (!survey) {
			throw new Error('No ARK survey found.');
		}

		return survey;
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

			// Create new reach segments if applicable
			if (insertData.reachSegments) {
				const reachSegmentsFormatted =
					insertData.reachSegments as Prisma.arkSurveyReachSegmentsCreateManyInput[];
				reachSegmentsFormatted.map((segment) => {
					segment.arkSurveyId = existingRecord.id;
					segment.id = newId();
				});

				await this.prisma.arkSurveyReachSegments.createMany({
					data: reachSegmentsFormatted,
				});
			}

			return this.updateArkSurvey(insertData);
		} else {
			await this.createArkSurvey(insertData);
			// Create new reach segments if applicable
			if (insertData.reachSegments) {
				const reachSegmentsFormatted =
					insertData.reachSegments as Prisma.arkSurveyReachSegmentsCreateManyInput[];
				reachSegmentsFormatted.map((segment) => {
					segment.arkSurveyId = existingRecord.id;
					segment.id = newId();
				});

				await this.prisma.arkSurveyReachSegments.createMany({
					data: reachSegmentsFormatted,
				});
			}

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
			},
		});
		return !!segmentCount;
	}
}
