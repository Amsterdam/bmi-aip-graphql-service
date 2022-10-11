import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import { IJunctionBoxSurveyRepository, JunctionBoxSurvey } from './types';
import { CreateJunctionBoxSurveyInput } from './dto/create-junction-box-survey.input';
import { UpdateJunctionBoxSurveyInput } from './dto/update-junction-box-survey.input';
import { JunctionBoxSurveyNotFoundException } from './exceptions/junction-box-survey-not-found.exception';

@Injectable()
export class JunctionBoxSurveyRepository implements IJunctionBoxSurveyRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async getJunctionBoxSurvey(surveyId: string, junctionBoxId: string): Promise<JunctionBoxSurvey> {
		const junctionBoxSurvey = await this.prisma.spanJunctionBoxSurveys.findFirst({
			where: {
				surveyId,
				junctionBoxId,
			},
		});

		if (!junctionBoxSurvey) throw new JunctionBoxSurveyNotFoundException(surveyId, junctionBoxId);

		return junctionBoxSurvey;
	}

	async createJunctionBoxSurvey({
		surveyId,
		junctionBoxId,
		cableDamage,
		faultyMontageTensionWire,
		faultyMontageFacade,
		junctionBoxDamage,
		stickerNotReadable,
		remarks,
	}: CreateJunctionBoxSurveyInput): Promise<JunctionBoxSurvey> {
		return this.prisma.spanJunctionBoxSurveys.create({
			data: {
				id: newId(),
				surveys: { connect: { id: surveyId } },
				spanJunctionBoxes: { connect: { id: junctionBoxId } },
				cableDamage,
				faultyMontageTensionWire,
				faultyMontageFacade,
				junctionBoxDamage,
				stickerNotReadable,
				remarks,
			},
		});
	}

	async updateJunctionBoxSurvey({
		id,
		cableDamage,
		faultyMontageTensionWire,
		faultyMontageFacade,
		junctionBoxDamage,
		stickerNotReadable,
		remarks,
	}: UpdateJunctionBoxSurveyInput): Promise<JunctionBoxSurvey> {
		return this.prisma.spanJunctionBoxSurveys.update({
			where: {
				id,
			},
			data: {
				cableDamage,
				faultyMontageTensionWire,
				faultyMontageFacade,
				junctionBoxDamage,
				stickerNotReadable,
				remarks,
			},
		});
	}

	async deleteJunctionBoxSurvey(id: string): Promise<JunctionBoxSurvey> {
		return this.prisma.spanJunctionBoxSurveys.delete({
			where: { id },
		});
	}
}
