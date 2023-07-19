import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
import { newId } from '../../utils';

import { IFacadeSurveyRepository, FacadeSurvey } from './types';
import { CreateFacadeSurveyInput } from './dto/create-facade-survey.input';
import { UpdateFacadeSurveyInput } from './dto/update-facade-survey.input';
import { SupportSystemSurveyNotFoundException } from './exceptions/support-system-survey-not-found.exception';
import { SupportSystemNotFoundException } from './exceptions/support-system-not-found.exception';

@Injectable()
export class FacadeSurveyRepository implements IFacadeSurveyRepository {
	public constructor(private readonly prisma: PrismaService) {}

	async getFacadeSurvey(supportSystemId: string): Promise<FacadeSurvey> {
		const facadeSurvey = await this.prisma.spanSupportSystemFacadeSurveys.findFirst({
			where: { supportSystemId },
		});

		if (!facadeSurvey) throw new SupportSystemSurveyNotFoundException(supportSystemId);

		return facadeSurvey;
	}

	async createFacadeSurvey({
		supportSystemId,
		facadeDamageWithin1m,
		hinderingVegetation,
		wallPlateDamage,
		faultyMontage,
		nutNotFullyOverThreadedRod,
		missingFasteners,
		measuredPreload,
		appliedAdditionalTraction,
		facadeConnectionFailed,
		facadeConnectionFailureAdditionalTraction,
		remarks,
	}: CreateFacadeSurveyInput): Promise<FacadeSurvey> {
		return this.prisma.spanSupportSystemFacadeSurveys.create({
			data: {
				id: newId(),
				spanSupportSystems: { connect: { id: supportSystemId } },
				facadeDamageWithin1m,
				hinderingVegetation,
				wallPlateDamage,
				faultyMontage,
				nutNotFullyOverThreadedRod,
				missingFasteners,
				measuredPreload,
				appliedAdditionalTraction,
				facadeConnectionFailed,
				facadeConnectionFailureAdditionalTraction,
				remarks,
			},
		});
	}

	async updateFacadeSurvey({
		id,
		facadeDamageWithin1m,
		hinderingVegetation,
		wallPlateDamage,
		faultyMontage,
		nutNotFullyOverThreadedRod,
		missingFasteners,
		measuredPreload,
		appliedAdditionalTraction,
		facadeConnectionFailed,
		facadeConnectionFailureAdditionalTraction,
		remarks,
	}: UpdateFacadeSurveyInput): Promise<FacadeSurvey> {
		return this.prisma.spanSupportSystemFacadeSurveys.update({
			where: {
				id,
			},
			data: {
				facadeDamageWithin1m,
				hinderingVegetation,
				wallPlateDamage,
				faultyMontage,
				nutNotFullyOverThreadedRod,
				missingFasteners,
				measuredPreload,
				appliedAdditionalTraction,
				facadeConnectionFailed,
				facadeConnectionFailureAdditionalTraction,
				remarks,
			},
		});
	}

	async deleteFacadeSurvey(id: string): Promise<FacadeSurvey> {
		return this.prisma.spanSupportSystemFacadeSurveys.delete({
			where: { id },
		});
	}

	async getFacadeSurveyOnPermanentId(supportSystemId: string): Promise<FacadeSurvey> {
		const spanSupportSystem = await this.prisma.spanSupportSystems.findUnique({
			where: {
				id: supportSystemId,
			},
			select: {
				permanentId: true,
			},
		});

		if (!spanSupportSystem) {
			throw new SupportSystemNotFoundException(supportSystemId);
		}

		return this.getFacadeSurvey(spanSupportSystem.permanentId);
	}

	async hasDamage(supportSystemId: string): Promise<boolean> {
		let facadeSurvey: FacadeSurvey;
		try {
			facadeSurvey = await this.getFacadeSurveyOnPermanentId(supportSystemId);
		} catch (e) {
			return false;
		}

		return (
			facadeSurvey.hinderingVegetation ||
			facadeSurvey.faultyMontage ||
			facadeSurvey.nutNotFullyOverThreadedRod ||
			facadeSurvey.missingFasteners ||
			facadeSurvey.facadeConnectionFailed
		);
	}
}
