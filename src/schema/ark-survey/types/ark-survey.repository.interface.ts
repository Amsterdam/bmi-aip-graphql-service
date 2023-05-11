import { Prisma } from '@prisma/client';
import { Point } from 'geojson';

import { CreateArkSurveyInput } from '../dto/create-ark-survey.input';
import { UpdateArkSurveyInput } from '../dto/update-ark-survey.input';

const arkSurvey = Prisma.validator<Prisma.arkSurveysArgs>()({
	select: {
		id: true,
		surveyId: true,
		created_at: true,
		updated_at: true,
		deleted_at: true,
		arkGeographyRDStart: true,
		arkGeographyRDEnd: true,
	},
});

export type ArkSurveyWithoutGeography = Prisma.arkSurveysGetPayload<typeof arkSurvey>;
export type ArkSurvey = ArkSurveyWithoutGeography & {
	arkGeographyStart?: Point;
	arkGeographyEnd?: Point;
};

export interface IArkSurveyRepository {
	getArkSurvey(surveyId: string): Promise<ArkSurvey>;
	createArkSurvey(input: CreateArkSurveyInput): Promise<ArkSurvey>;
	deleteArkSurvey(identifier: string): Promise<ArkSurvey>;
	saveArkCompletion(input: UpdateArkSurveyInput): Promise<ArkSurvey>;
}
