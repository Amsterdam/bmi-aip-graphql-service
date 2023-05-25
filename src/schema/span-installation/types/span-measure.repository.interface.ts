import { Prisma } from '@prisma/client';

const spanMeasure = Prisma.validator<Prisma.spanMeasuresArgs>()({
	select: {
		id: true,
		optionId: true,
		decompositionId: true,
		decompositionType: true,
		surveyId: true,
		description: true,
		created_at: true,
		updated_at: true,
	},
});

export type SpanMeasure = Prisma.spanMeasuresGetPayload<typeof spanMeasure>;

export interface ISpanMeasureRepository {
	findSpanMeasures(surveyId: string): Promise<SpanMeasure[]>;
}
