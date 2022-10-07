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

	async getMastSurvey(surveyId: string, supportSystemId: string): Promise<MastSurvey> {
		const mastSurvey = await this.prisma.spanSupportSystemMastSurveys.findFirst({
			where: {
				surveyId,
				supportSystemId,
			},
		});

		if (!mastSurvey) throw new SupportSystemSurveyNotFoundException(surveyId, supportSystemId);

		return mastSurvey;
	}

	async createMastSurvey({
		surveyId,
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
				surveys: { connect: { id: surveyId } },
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
}
