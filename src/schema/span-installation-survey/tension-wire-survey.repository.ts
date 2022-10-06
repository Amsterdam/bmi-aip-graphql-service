import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import { ITensionWireSurveyRepository, TensionWireSurvey } from './types/tension-wire-survey.repository.interface';
import { CreateTensionWireSurveyInput } from './dto/create-tension-wire-survey.input';
import { UpdateTensionWireSurveyInput } from './dto/update-tension-wire-survey.input';

@Injectable()
export class TensionWireSurveyRepository implements ITensionWireSurveyRepository {
	public constructor(private readonly prisma: PrismaService) {}

	getTensionWireSurvey(surveyId: string, supportSystemId: string): Promise<TensionWireSurvey> {
		return this.prisma.spanSupportSystemTensionWireSurveys.findFirst({
			where: {
				surveyId,
				supportSystemId,
			},
		});
	}

	async createTensionWireSurvey({
		surveyId,
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
				surveys: { connect: { id: surveyId } },
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
