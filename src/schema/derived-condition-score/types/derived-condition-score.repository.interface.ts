import { Prisma } from '@prisma/client';

const derivedConditionScores = Prisma.validator<Prisma.derivedConditionScoresArgs>()({
	select: {
		id: true,
		elementId: true,
		unitId: true,
		manifestationId: true,
		surveyId: true,
		score: true,
		derivedScore: true,
		careScore: true,
		derivedCareScore: true,
		replacementIndex: true,
		created_at: true,
		updated_at: true,
	},
});

export type DerivedConditionScore = Prisma.derivedConditionScoresGetPayload<typeof derivedConditionScores>;

export interface IDerivedConditionScoreRepository {
	getDerivedConditionScoresByElementId(elementId: string): Promise<DerivedConditionScore[]>;
}
