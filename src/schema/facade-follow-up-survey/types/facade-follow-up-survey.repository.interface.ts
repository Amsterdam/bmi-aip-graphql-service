import { Prisma } from '@prisma/client';

import { UpdateFacadeFollowUpSurveyInput } from '../dto/update-facade-follow-up-survey.input';

const facadeFollowUpSurvey = Prisma.validator<Prisma.surveysArgs>()({
	select: {
		id: true,
		preparedAuthor: true,
		preparedDate: true,
		verifiedAuthor: true,
		verifiedDate: true,
		inspectionStandardData: true,
	},
});

export type FacadeFollowUpSurvey = Prisma.surveysGetPayload<typeof facadeFollowUpSurvey>;

export interface IFacadeFollowUpSurveyRepository {
	getFacadeFollowUpSurvey(surveyId: string): Promise<FacadeFollowUpSurvey>;
	updateFacadeFollowUpSurvey(input: UpdateFacadeFollowUpSurveyInput): Promise<FacadeFollowUpSurvey>;
}
