import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import { INodeSurveyRepository, NodeSurvey } from './types';
import { CreateNodeSurveyInput } from './dto/create-node-survey.input';
import { UpdateNodeSurveyInput } from './dto/update-node-survey.input';
import { SupportSystemSurveyNotFoundException } from './exceptions/support-system-survey-not-found.exception';

@Injectable()
export class NodeSurveyRepository implements INodeSurveyRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async getNodeSurvey(surveyId: string, supportSystemId: string): Promise<NodeSurvey> {
		const nodeSurvey = await this.prisma.spanSupportSystemNodeSurveys.findFirst({
			where: {
				surveyId,
				supportSystemId,
			},
		});

		if (!nodeSurvey) throw new SupportSystemSurveyNotFoundException(surveyId, supportSystemId);

		return nodeSurvey;
	}

	async createNodeSurvey({
		surveyId,
		supportSystemId,
		nodeDamage,
		remarks,
	}: CreateNodeSurveyInput): Promise<NodeSurvey> {
		return this.prisma.spanSupportSystemNodeSurveys.create({
			data: {
				id: newId(),
				surveys: { connect: { id: surveyId } },
				spanSupportSystems: { connect: { id: supportSystemId } },
				nodeDamage,
				remarks,
			},
		});
	}

	async updateNodeSurvey({ id, nodeDamage, remarks }: UpdateNodeSurveyInput): Promise<NodeSurvey> {
		return this.prisma.spanSupportSystemNodeSurveys.update({
			where: {
				id,
			},
			data: {
				nodeDamage,
				remarks,
			},
		});
	}

	async deleteNodeSurvey(id: string): Promise<NodeSurvey> {
		return this.prisma.spanSupportSystemNodeSurveys.delete({
			where: { id },
		});
	}
}
