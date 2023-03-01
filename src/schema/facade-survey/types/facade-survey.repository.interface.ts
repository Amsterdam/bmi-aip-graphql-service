import { Prisma } from '@prisma/client';

import { CreateFacadeSurveyInput } from '../dto/create-facade-survey.input';
import { UpdateFacadeSurveyInput } from '../dto/update-facade-survey.input';

const facadeSurvey = Prisma.validator<Prisma.facadeSurveysArgs>()({
	select: {
		id: true,
		surveyId: true,
		created_at: true,
		updated_at: true,
		deleted_at: true,
		preparedAuthor: true,
		preparedDate: true,
		verifiedAuthor: true,
		verifiedDate: true,
		remarks: true,
	},
});

export type FacadeSurvey = Prisma.facadeSurveysGetPayload<typeof facadeSurvey>;

export interface IFacadeSurveyRepository {
	// getFacadeSurvey(surveyId: string): Promise<FacadeSurvey>;
	createFacadeSurvey(input: CreateFacadeSurveyInput): Promise<FacadeSurvey>;
	updateFacadeSurvey(input: UpdateFacadeSurveyInput): Promise<FacadeSurvey>;
	deleteFacadeSurvey(identifier: string): Promise<FacadeSurvey>;
}
