import { Prisma } from '@prisma/client';

import { CreateFacadeSurveyInput } from '../dto/create-facade-survey.input';
import { UpdateFacadeSurveyInput } from '../dto/update-facade-survey.input';

const facadeSurveys = Prisma.validator<Prisma.spanSupportSystemFacadeSurveysArgs>()({
	select: {
		id: true,
		surveyId: true,
		supportSystemId: true,
		facadeDamageWithin1m: true,
		hinderingVegetation: true,
		wallPlateDamage: true,
		faultyMontage: true,
		nutNotFullyOverThreadedRod: true,
		missingFasteners: true,
		measuredPreload: true,
		appliedAdditionalTraction: true,
		facadeConnectionFailed: true,
		facadeConnectionFailureAdditionalTraction: true,
		remarks: true,
		created_at: true,
		updated_at: true,
	},
});

export type FacadeSurvey = Prisma.spanSupportSystemFacadeSurveysGetPayload<typeof facadeSurveys>;

export interface IFacadeSurveyRepository {
	getFacadeSurvey(surveyId: string, supportSystemId: string): Promise<FacadeSurvey>;
	createFacadeSurvey(input: CreateFacadeSurveyInput): Promise<FacadeSurvey>;
	updateFacadeSurvey(input: UpdateFacadeSurveyInput): Promise<FacadeSurvey>;
}
