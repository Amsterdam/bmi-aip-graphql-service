import { Prisma } from '@prisma/client';

const spanMeasure = Prisma.validator<Prisma.spanMeasuresArgs>()({
	select: {
		id: true,
		decompositionId: true,
		decompositionType: true,
		surveyId: true,
		name: true,
		created_at: true,
		updated_at: true,
	},
});

export type SpanMeasure = Prisma.spanMeasuresGetPayload<typeof spanMeasure>;

export interface ISpanMeasureRepository {
	getSpanMeasures(surveyId: string): Promise<SpanMeasure[]>;
}
