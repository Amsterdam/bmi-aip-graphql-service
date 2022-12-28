import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import { ReachSegment, IReachSegmentRepository } from './types/reach-segment.repository.interface';
import { CreateReachSegmentInput } from './dto/create-reach-segment.input';
import { UpdateReachSegmentInput } from './dto/update-reach-segment.input';
// import { UpdateReachSegmentNormalizedInput } from './dto/update-support-system-normalized.input';

@Injectable()
export class ReachSegmentRepository implements IReachSegmentRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async createReachSegment({
		id,
		surveyId,
		name,
		reachSegmentLength,
		riskScore,
		riskScoreDigit,
		failureModeScore,
		consequenceScore,
		sortNumber,
	}: CreateReachSegmentInput): Promise<ReachSegment> {
		const data: Prisma.arkSurveyReachSegmentsCreateInput = {
			id: newId(),
			surveys: {
				connect: {
					id: surveyId,
				},
			},
			name,
			reachSegmentLength,
			riskScore,
			riskScoreDigit,
			failureModeScore,
			consequenceScore,
			sortNumber,
		};

		const reachSegment = await this.prisma.arkSurveyReachSegments.create({ data });

		return {
			...reachSegment,
		};
	}

	async getReachSegments(surveyId: string): Promise<ReachSegment[]> {
		const reachSegments = (await this.prisma.arkSurveyReachSegments.findMany({
			where: {
				surveyId,
				deleted_at: null,
			},
		})) as ReachSegment[];

		console.log(reachSegments);

		return Promise.all(
			reachSegments.map(async (reachSegment) => {
				return reachSegment;
			}),
		);
	}

	async updateReachSegment({
		id,
		surveyId,
		name,
		reachSegmentLength,
		riskScore,
		riskScoreDigit,
		failureModeScore,
		consequenceScore,
		sortNumber,
	}: UpdateReachSegmentInput): Promise<ReachSegment> {
		const data: Prisma.arkSurveyReachSegmentsUpdateInput = {
			id: newId(),
			surveys: {
				connect: {
					id: surveyId,
				},
			},
			name,
			reachSegmentLength,
			riskScore,
			riskScoreDigit,
			failureModeScore,
			consequenceScore,
			sortNumber,
		};

		const reachSegment = await this.prisma.arkSurveyReachSegments.update({
			where: { id },
			data,
		});

		return reachSegment;
	}

	// 	// Work around Prisma not supporting spatial data types
	// 	return { ...supportSystem, geography: await this.getGeographyAsGeoJSON(id) };
	// }

	async deleteReachSegment(identifier: string): Promise<ReachSegment> {
		const data: Prisma.arkSurveyReachSegmentsUpdateInput = {
			deleted_at: new Date(),
		};

		const reachSegment = await this.prisma.arkSurveyReachSegments.update({
			where: { id: identifier },
			data,
		});

		return reachSegment;
	}

	// 	// Work around Prisma not supporting spatial data types
	// 	// return { ...reachSegment, geography: await this.getGeographyAsGeoJSON(identifier) };
	// 	return { ...reachSegment };
	// }

	// async getGeographyAsGeoJSON(identifier: string): Promise<Point | null> {
	// 	const result = await this.prisma.$queryRaw<{ geography?: Point | null }>`
	// 		SELECT ST_AsGeoJSON(geography) as geography
	// 		FROM "spanSupportSystems"
	// 		WHERE id = ${identifier};
	// 	`;
	// 	const geography = result?.[0]?.geography;
	// 	return geography ? JSON.parse(geography) : null;
	// }
}
