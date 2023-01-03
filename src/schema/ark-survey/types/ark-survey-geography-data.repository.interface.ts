import { Prisma } from '@prisma/client';

import { CreateArkSurveyGeographyDataInput } from '../dto/create-ark-survey-geography-data.input';
import { UpdateArkSurveyGeographyDataInput } from '../dto/update-ark-survey-geography-data.input';

const arkSurveyGeographyData = Prisma.validator<Prisma.arkSurveyGeographyDataArgs>()({
	select: {
		id: true,
		surveyId: true,
		ArkGeographyStart: true,
		ArkGeographyRDStart: true,
		ArkGeographyEnd: true,
		ArkGeographyRDEnd: true,
		created_at: true,
		updated_at: true,
		deleted_at: true,
	},
});

export type ArkSurveyGeographyData = Prisma.arkSurveyGeographyDataGetPayload<typeof arkSurveyGeographyData>;

export interface IArkSurveyGeographyDataRepository {
	getGeographyData(surveyId: string): Promise<ArkSurveyGeographyData[]>;
	createArkSurveyGeographyData(input: CreateArkSurveyGeographyDataInput): Promise<ArkSurveyGeographyData>;
	updateArkSurveyGeographyData(input: UpdateArkSurveyGeographyDataInput): Promise<ArkSurveyGeographyData>;
	deleteArkSurveyGeographyData(identifier: string): Promise<ArkSurveyGeographyData>;
}
