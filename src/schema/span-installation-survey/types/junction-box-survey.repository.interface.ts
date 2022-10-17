import { Prisma } from '@prisma/client';

import { CreateJunctionBoxSurveyInput } from '../dto/create-junction-box-survey.input';
import { UpdateJunctionBoxSurveyInput } from '../dto/update-junction-box-survey.input';

const mastSurveys = Prisma.validator<Prisma.spanJunctionBoxSurveysArgs>()({
	select: {
		id: true,
		junctionBoxId: true,
		cableDamage: true,
		faultyMontageTensionWire: true,
		faultyMontageFacade: true,
		junctionBoxDamage: true,
		stickerNotReadable: true,
		remarks: true,
		created_at: true,
		updated_at: true,
	},
});

export type JunctionBoxSurvey = Prisma.spanJunctionBoxSurveysGetPayload<typeof mastSurveys>;

export interface IJunctionBoxSurveyRepository {
	getJunctionBoxSurvey(surveyId: string, supportSystemId: string): Promise<JunctionBoxSurvey>;
	createJunctionBoxSurvey(input: CreateJunctionBoxSurveyInput): Promise<JunctionBoxSurvey>;
	updateJunctionBoxSurvey(input: UpdateJunctionBoxSurveyInput): Promise<JunctionBoxSurvey>;
}
