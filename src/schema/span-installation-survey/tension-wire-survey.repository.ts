import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import { ITensionWireSurveyRepository, TensionWireSurvey } from './types';
import { CreateTensionWireSurveyInput } from './dto/create-tension-wire-survey.input';
import { UpdateTensionWireSurveyInput } from './dto/update-tension-wire-survey.input';
import { SupportSystemSurveyNotFoundException } from './exceptions/support-system-survey-not-found.exception';

@Injectable()
export class TensionWireSurveyRepository implements ITensionWireSurveyRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async getTensionWireSurvey(supportSystemId: string): Promise<TensionWireSurvey> {
		const tensionWireSurvey = await this.prisma.spanSupportSystemTensionWireSurveys.findFirst({
			where: {
				supportSystemId,
			},
		});

		if (!tensionWireSurvey) throw new SupportSystemSurveyNotFoundException(supportSystemId);

		return tensionWireSurvey;
	}

	async createTensionWireSurvey({
		supportSystemId,
		tensionWireDamage,
		thirdPartyObjectsAttached,
		gaffTerminalDamage,
		gaffTerminalMissingParts,
		faultyMontage,
		tensionWireClampDamage,
		remarks,
	}: CreateTensionWireSurveyInput): Promise<TensionWireSurvey> {
		return this.prisma.spanSupportSystemTensionWireSurveys.create({
			data: {
				id: newId(),
				spanSupportSystems: { connect: { id: supportSystemId } },
				tensionWireDamage,
				thirdPartyObjectsAttached,
				gaffTerminalDamage,
				gaffTerminalMissingParts,
				faultyMontage,
				tensionWireClampDamage,
				remarks,
			},
		});
	}

	async updateTensionWireSurvey({
		id,
		tensionWireDamage,
		thirdPartyObjectsAttached,
		gaffTerminalDamage,
		gaffTerminalMissingParts,
		faultyMontage,
		tensionWireClampDamage,
		remarks,
	}: UpdateTensionWireSurveyInput): Promise<TensionWireSurvey> {
		return this.prisma.spanSupportSystemTensionWireSurveys.update({
			where: {
				id,
			},
			data: {
				tensionWireDamage,
				thirdPartyObjectsAttached,
				gaffTerminalDamage,
				gaffTerminalMissingParts,
				faultyMontage,
				tensionWireClampDamage,
				remarks,
			},
		});
	}

	async deleteTensionWireSurvey(id: string): Promise<TensionWireSurvey> {
		return this.prisma.spanSupportSystemTensionWireSurveys.delete({
			where: { id },
		});
	}
}
