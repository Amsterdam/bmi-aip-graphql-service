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

	async getNodeSurvey(supportSystemId: string): Promise<NodeSurvey> {
		const nodeSurvey = await this.prisma.spanSupportSystemNodeSurveys.findFirst({
			where: {
				supportSystemId,
			},
		});

		if (!nodeSurvey) throw new SupportSystemSurveyNotFoundException(supportSystemId);

		return nodeSurvey;
	}

	async createNodeSurvey({ supportSystemId, nodeDamage, remarks }: CreateNodeSurveyInput): Promise<NodeSurvey> {
		return this.prisma.spanSupportSystemNodeSurveys.create({
			data: {
				id: newId(),
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

	async getNodeSurveyOnPermanentId(supportSystemId: string): Promise<NodeSurvey> {
		const result = await this.prisma.spanSupportSystems.findUnique({
			where: {
				id: supportSystemId,
			},
			select: {
				permanentId: true,
			},
		});

		if (!result || !result.permanentId) {
			throw new SupportSystemSurveyNotFoundException(supportSystemId);
		}

		return this.getNodeSurvey(result.permanentId);
	}

	async hasDamage(supportSystemId: string): Promise<boolean> {
		let nodeSurvey;

		try {
			nodeSurvey = await this.getNodeSurveyOnPermanentId(supportSystemId);
		} catch (exception) {
			return false;
		}

		return nodeSurvey.nodeDamage;
	}
}
