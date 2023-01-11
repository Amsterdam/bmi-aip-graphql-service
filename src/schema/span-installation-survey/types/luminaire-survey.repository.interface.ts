import { Prisma } from '@prisma/client';

import { CreateLuminaireSurveyInput } from '../dto/create-luminaire-survey.input';
import { UpdateLuminaireSurveyInput } from '../dto/update-luminaire-survey.input';

const mastSurveys = Prisma.validator<Prisma.spanLuminaireSurveysArgs>()({
	select: {
		id: true,
		luminaireId: true,
		luminaireDamage: true,
		remarks: true,
		created_at: true,
		updated_at: true,
	},
});

export type LuminaireSurvey = Prisma.spanLuminaireSurveysGetPayload<typeof mastSurveys>;

export interface ILuminaireSurveyRepository {
	getLuminaireSurvey(surveyId: string, supportSystemId: string): Promise<LuminaireSurvey>;
	createLuminaireSurvey(input: CreateLuminaireSurveyInput): Promise<LuminaireSurvey>;
	updateLuminaireSurvey(input: UpdateLuminaireSurveyInput): Promise<LuminaireSurvey>;
}
