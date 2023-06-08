import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import { IMastSurveyRepository, MastSurvey } from './types';
import { CreateMastSurveyInput } from './dto/create-mast-survey.input';
import { UpdateMastSurveyInput } from './dto/update-mast-survey.input';
import { SupportSystemSurveyNotFoundException } from './exceptions/support-system-survey-not-found.exception';

@Injectable()
export class MastSurveyRepository implements IMastSurveyRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async getMastSurvey(supportSystemId: string): Promise<MastSurvey> {
		const mastSurvey = await this.prisma.spanSupportSystemMastSurveys.findFirst({
			where: {
				supportSystemId,
			},
		});

		if (!mastSurvey) throw new SupportSystemSurveyNotFoundException(supportSystemId);

		return mastSurvey;
	}

	async createMastSurvey({
		supportSystemId,
		mastDamage,
		mastMissingParts,
		tensionMastAngle,
		mastAttachmentDamage,
		mastBracketMissingParts,
		mastBracketDamage,
		remarks,
	}: CreateMastSurveyInput): Promise<MastSurvey> {
		return this.prisma.spanSupportSystemMastSurveys.create({
			data: {
				id: newId(),
				spanSupportSystems: { connect: { id: supportSystemId } },
				mastDamage,
				mastMissingParts,
				tensionMastAngle,
				mastAttachmentDamage,
				mastBracketMissingParts,
				mastBracketDamage,
				remarks,
			},
		});
	}

	async updateMastSurvey({
		id,
		mastDamage,
		mastMissingParts,
		tensionMastAngle,
		mastAttachmentDamage,
		mastBracketMissingParts,
		mastBracketDamage,
		remarks,
	}: UpdateMastSurveyInput): Promise<MastSurvey> {
		return this.prisma.spanSupportSystemMastSurveys.update({
			where: {
				id,
			},
			data: {
				mastDamage,
				mastMissingParts,
				tensionMastAngle,
				mastAttachmentDamage,
				mastBracketMissingParts,
				mastBracketDamage,
				remarks,
			},
		});
	}

	async deleteMastSurvey(id: string): Promise<MastSurvey> {
		return this.prisma.spanSupportSystemMastSurveys.delete({
			where: { id },
		});
	}

	async getMastSurveyOnPermanentId(supportSystemId: string): Promise<MastSurvey> {
		const { permanentId } = await this.prisma.spanSupportSystems.findUnique({
			where: {
				id: supportSystemId,
			},
			select: {
				permanentId: true,
			},
		});

		return this.getMastSurvey(permanentId);
	}

	async hasDamage(supportSystemId: string): Promise<boolean> {
		const mastSurvey = await this.getMastSurveyOnPermanentId(supportSystemId);

		return (
			mastSurvey.mastDamage ||
			mastSurvey.mastAttachmentDamage ||
			mastSurvey.mastBracketMissingParts ||
			mastSurvey.mastBracketDamage ||
			mastSurvey.mastMissingParts
		);
	}
}
