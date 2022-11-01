import { Prisma } from '@prisma/client';

import { CreateTensionWireSurveyInput } from '../dto/create-tension-wire-survey.input';
import { UpdateTensionWireSurveyInput } from '../dto/update-tension-wire-survey.input';

const tensionWireSurveys = Prisma.validator<Prisma.spanSupportSystemTensionWireSurveysArgs>()({
	select: {
		id: true,
		supportSystemId: true,
		tensionWireDamage: true,
		thirdPartyObjectsAttached: true,
		gaffTerminalDamage: true,
		gaffTerminalMissingParts: true,
		faultyMontage: true,
		tensionWireClampDamage: true,
		remarks: true,
		created_at: true,
		updated_at: true,
	},
});

export type TensionWireSurvey = Prisma.spanSupportSystemTensionWireSurveysGetPayload<typeof tensionWireSurveys>;

export interface ITensionWireSurveyRepository {
	getTensionWireSurvey(surveyId: string, supportSystemId: string): Promise<TensionWireSurvey>;
	createTensionWireSurvey(input: CreateTensionWireSurveyInput): Promise<TensionWireSurvey>;
	updateTensionWireSurvey(input: UpdateTensionWireSurveyInput): Promise<TensionWireSurvey>;
}
