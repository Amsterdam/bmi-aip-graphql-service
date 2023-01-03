import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import { ReachSegment, IReachSegmentRepository } from './types/reach-segment.repository.interface';
import { CreateReachSegmentInput } from './dto/create-reach-segment.input';
import { UpdateReachSegmentInput } from './dto/update-reach-segment.input';

@Injectable()
export class ReachSegmentRepository implements IReachSegmentRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async createReachSegment({
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

		if (!sortNumber) {
			data.sortNumber = (await this.findHighestSortNumber(surveyId)) + 1;
		}

		return this.prisma.arkSurveyReachSegments.create({ data });
	}

	async findHighestSortNumber(surveyId: string): Promise<number> {
		const result = await this.prisma.$queryRaw<{
			max: number | null;
		}>`SELECT MAX("sortNumber") FROM "arkSurveyReachSegments" WHERE "surveyId" = ${surveyId};`;
		return result[0].max ?? 0;
	}

	async getReachSegments(surveyId: string): Promise<ReachSegment[]> {
		return this.prisma.arkSurveyReachSegments.findMany({
			where: {
				surveyId,
				deleted_at: null,
			},
			orderBy: [
				{
					sortNumber: 'asc',
				},
			],
		});
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

		return this.prisma.arkSurveyReachSegments.update({
			where: { id },
			data,
		});
	}

	async deleteReachSegment(identifier: string): Promise<ReachSegment> {
		const data: Prisma.arkSurveyReachSegmentsUpdateInput = {
			deleted_at: new Date(),
		};

		return this.prisma.arkSurveyReachSegments.update({
			where: { id: identifier },
			data,
		});
	}
}
