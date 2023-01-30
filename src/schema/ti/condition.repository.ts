import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import { Condition, IConditionRepository } from './types/condition.repository.interface';
import { CreateConditionInput } from './dto/create-condition.input';
import { UpdateConditionInput } from './dto/update-condition.input';

@Injectable()
export class ConditionRepository implements IConditionRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async createCondition({
		surveyId,
		elementId,
		unitId,
		manifestationId,
		score,
		advice,
		cost,
		costYear,
		careScore,
		investigationPriority,
		craInspectionRemarks,
		craInitialScore,
		craHistoryScore,
		craInspectionScore,
		craInitialRemarks,
		craHistoryRemarks,
		craInitialUnityCheck,
		craHistoryUnityCheck,
		ramsMaxTotalPriority,
		ramsMaxWeightedPriority,
		isFurtherInvestigation,
	}: CreateConditionInput): Promise<Condition> {
		const data: Prisma.conditionsCreateInput = {
			id: newId(),
			surveys: { connect: { id: surveyId } },
			score,
			advice,
			cost,
			costYear,
			careScore,
			investigationPriority,
			craInspectionRemarks,
			craInitialScore,
			craHistoryScore,
			craInspectionScore,
			craInitialRemarks,
			craHistoryRemarks,
			craInitialUnityCheck,
			craHistoryUnityCheck,
			ramsMaxTotalPriority,
			ramsMaxWeightedPriority,
			isFurtherInvestigation,
		};

		return this.prisma.conditions.create({ data });
	}

	async getConditions(surveyId: string): Promise<Condition[]> {
		return this.prisma.conditions.findMany({
			where: {
				surveyId,
			},
		});
	}

	async updateCondition({
		id,
		score,
		advice,
		cost,
		costYear,
		careScore,
		investigationPriority,
		craInspectionRemarks,
		craInitialScore,
		craHistoryScore,
		craInspectionScore,
		craInitialRemarks,
		craHistoryRemarks,
		craInitialUnityCheck,
		craHistoryUnityCheck,
		ramsMaxTotalPriority,
		ramsMaxWeightedPriority,
		isFurtherInvestigation,
	}: UpdateConditionInput): Promise<Condition> {
		const data: Prisma.conditionsUpdateInput = {
			score,
			advice,
			cost,
			costYear,
			careScore,
			investigationPriority,
			craInspectionRemarks,
			craInitialScore,
			craHistoryScore,
			craInspectionScore,
			craInitialRemarks,
			craHistoryRemarks,
			craInitialUnityCheck,
			craHistoryUnityCheck,
			ramsMaxTotalPriority,
			ramsMaxWeightedPriority,
			isFurtherInvestigation,
		};

		return this.prisma.conditions.update({
			where: { id },
			data,
		});
	}
}
