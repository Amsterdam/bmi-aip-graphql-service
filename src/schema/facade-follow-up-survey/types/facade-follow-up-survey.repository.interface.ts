import { Prisma } from '@prisma/client';

import { CreateFacadeFollowUpSurveyInput } from '../dto/create-facade-follow-up-survey.input';
import { UpdateFacadeFollowUpSurveyInput } from '../dto/update-facade-follow-up-survey.input';

const facadeFollowUpSurvey = Prisma.validator<Prisma.facadeFollowUpSurveysArgs>()({
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
	},
});

export type FacadeFollowUpSurvey = Prisma.facadeFollowUpSurveysGetPayload<typeof facadeFollowUpSurvey>;

export interface IFacadeFollowUpSurveyRepository {
	getFacadeFollowUpSurvey(surveyId: string): Promise<FacadeFollowUpSurvey>;
	createFacadeFollowUpSurvey(input: CreateFacadeFollowUpSurveyInput): Promise<FacadeFollowUpSurvey>;
	updateFacadeFollowUpSurvey(input: UpdateFacadeFollowUpSurveyInput): Promise<FacadeFollowUpSurvey>;
	deleteFacadeFollowUpSurvey(identifier: string): Promise<FacadeFollowUpSurvey>;
}
