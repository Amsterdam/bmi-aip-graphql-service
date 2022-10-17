import { Prisma } from '@prisma/client';

import { CreateMastSurveyInput } from '../dto/create-mast-survey.input';
import { UpdateMastSurveyInput } from '../dto/update-mast-survey.input';

const mastSurveys = Prisma.validator<Prisma.spanSupportSystemMastSurveysArgs>()({
	select: {
		id: true,
		supportSystemId: true,
		mastDamage: true,
		mastMissingParts: true,
		tensionMastAngle: true,
		mastAttachmentDamage: true,
		mastBracketMissingParts: true,
		mastBracketDamage: true,
		remarks: true,
		created_at: true,
		updated_at: true,
	},
});

export type MastSurvey = Prisma.spanSupportSystemMastSurveysGetPayload<typeof mastSurveys>;

export interface IMastSurveyRepository {
	getMastSurvey(surveyId: string, supportSystemId: string): Promise<MastSurvey>;
	createMastSurvey(input: CreateMastSurveyInput): Promise<MastSurvey>;
	updateMastSurvey(input: UpdateMastSurveyInput): Promise<MastSurvey>;
}
