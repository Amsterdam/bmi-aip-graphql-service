import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import { ILuminaireSurveyRepository, LuminaireSurvey } from './types';
import { CreateLuminaireSurveyInput } from './dto/create-luminaire-survey.input';
import { UpdateLuminaireSurveyInput } from './dto/update-luminaire-survey.input';
import { LuminaireSurveyNotFoundException } from './exceptions/luminaire-survey-not-found.exception';
import { LuminaireNotFoundException } from './exceptions/luminaire-not-found.exception';

@Injectable()
export class LuminaireSurveyRepository implements ILuminaireSurveyRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async getLuminaireSurvey(luminaireId: string): Promise<LuminaireSurvey> {
		const luminaireSurvey = await this.prisma.spanLuminaireSurveys.findFirst({
			where: {
				luminaireId,
			},
		});

		if (!luminaireSurvey) throw new LuminaireSurveyNotFoundException(luminaireId);

		return luminaireSurvey;
	}

	async createLuminaireSurvey({
		luminaireId,
		luminaireDamage,
		remarks,
	}: CreateLuminaireSurveyInput): Promise<LuminaireSurvey> {
		return this.prisma.spanLuminaireSurveys.create({
			data: {
				id: newId(),
				spanLuminaires: { connect: { id: luminaireId } },
				luminaireDamage,
				remarks,
			},
		});
	}

	async updateLuminaireSurvey({
		id,
		luminaireDamage,
		remarks,
	}: UpdateLuminaireSurveyInput): Promise<LuminaireSurvey> {
		return this.prisma.spanLuminaireSurveys.update({
			where: {
				id,
			},
			data: {
				luminaireDamage,
				remarks,
			},
		});
	}

	async deleteLuminaireSurvey(id: string): Promise<LuminaireSurvey> {
		return this.prisma.spanLuminaireSurveys.delete({
			where: { id },
		});
	}

	async getLuminaireSurveyOnPermanentId(luminaireId: string): Promise<LuminaireSurvey> {
		const luminaire = await this.prisma.spanLuminaires.findUnique({
			where: {
				id: luminaireId,
			},
			select: {
				permanentId: true,
			},
		});

		if (!luminaire) throw new LuminaireNotFoundException(luminaireId);

		return this.getLuminaireSurvey(luminaire.permanentId);
	}

	async hasDamage(luminaireId: string): Promise<boolean> {
		let luminaireSurvey: LuminaireSurvey;
		try {
			luminaireSurvey = await this.getLuminaireSurveyOnPermanentId(luminaireId);
		} catch (e) {
			return false;
		}

		return luminaireSurvey.luminaireDamage;
	}
}
