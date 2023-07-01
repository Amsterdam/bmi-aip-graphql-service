import { Prisma } from '@prisma/client';

import { UpdateSpanMeasuresSurveyInput } from '../dto/update-span-measures-survey.input';

const spanMeasuresSurvey = Prisma.validator<Prisma.surveysArgs>()({
	select: {
		id: true,
		inspectionStandardData: true,
	},
});

export type SpanMeasuresSurvey = Prisma.surveysGetPayload<typeof spanMeasuresSurvey>;

export interface ISpanMeasuresSurveyRepository {
	getSpanMeasuresSurvey(surveyId: string): Promise<SpanMeasuresSurvey>;
	updateSpanMeasuresSurvey(input: UpdateSpanMeasuresSurveyInput): Promise<SpanMeasuresSurvey>;
	updateSpanMeasuresCompletion(input: UpdateSpanMeasuresSurveyInput): Promise<SpanMeasuresSurvey>;
}
