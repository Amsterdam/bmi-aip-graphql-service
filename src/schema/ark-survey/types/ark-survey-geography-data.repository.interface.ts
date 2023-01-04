import { Prisma } from '@prisma/client';
import { Point } from 'geojson';

import { CreateArkSurveyGeographyDataInput } from '../dto/create-ark-survey-geography-data.input';
import { UpdateArkSurveyGeographyDataInput } from '../dto/update-ark-survey-geography-data.input';

const arkSurveyGeographyData = Prisma.validator<Prisma.arkSurveyGeographyDataArgs>()({
	select: {
		id: true,
		surveyId: true,
		created_at: true,
		updated_at: true,
		deleted_at: true,
		ArkGeographyRDStart: true,
		ArkGeographyRDEnd: true,
	},
});

export type ArkSurveyGeographyDataWithoutGeography = Prisma.arkSurveyGeographyDataGetPayload<
	typeof arkSurveyGeographyData
>;
export type ArkSurveyGeographyData = ArkSurveyGeographyDataWithoutGeography & {
	ArkGeographyStart?: Point;
	ArkGeographyEnd?: Point;
};

export interface IArkSurveyGeographyDataRepository {
	getGeographyData(surveyId: string): Promise<ArkSurveyGeographyData[]>;
	createArkSurveyGeographyData(input: CreateArkSurveyGeographyDataInput): Promise<ArkSurveyGeographyData>;
	updateArkSurveyGeographyData(input: UpdateArkSurveyGeographyDataInput): Promise<ArkSurveyGeographyData>;
	deleteArkSurveyGeographyData(identifier: string): Promise<ArkSurveyGeographyData>;
}
