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

	async getJunctionBoxSurvey(junctionBoxId: string): Promise<JunctionBoxSurvey> {
		const junctionBoxSurvey = await this.prisma.spanJunctionBoxSurveys.findFirst({
			where: {
				junctionBoxId,
			},
		});

		if (!junctionBoxSurvey) throw new JunctionBoxSurveyNotFoundException(junctionBoxId);

		return junctionBoxSurvey;
	}

	async createJunctionBoxSurvey({
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

	async getJunctionBoxSurveyOnPermanentId(junctionBoxId: string): Promise<JunctionBoxSurvey> {
		const junctionBox = await this.prisma.spanJunctionBoxes.findUnique({
			where: {
				id: junctionBoxId,
			},
			select: {
				permanentId: true,
			},
		});

		if (!junctionBox || !junctionBox.permanentId) {
			throw new JunctionBoxSurveyNotFoundException(junctionBoxId);
		}

		return this.getJunctionBoxSurvey(junctionBox.permanentId);
	}

	async hasDamage(junctionBoxId: string): Promise<boolean> {
		let junctionBoxSurvey: JunctionBoxSurvey | null = null;
		try {
			junctionBoxSurvey = await this.getJunctionBoxSurveyOnPermanentId(junctionBoxId);
		} catch (e) {
			return false;
		}

		return (
			junctionBoxSurvey.cableDamage ||
			junctionBoxSurvey.faultyMontageTensionWire ||
			junctionBoxSurvey.faultyMontageFacade ||
			junctionBoxSurvey.junctionBoxDamage ||
			junctionBoxSurvey.stickerNotReadable
		);
	}
}
