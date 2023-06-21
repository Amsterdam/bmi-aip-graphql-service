import { DerivedConditionScore } from './models/derived-condition-score.model';
import { DerivedConditionScore as DomainDerivedConditionScore } from './types/derived-condition-score.repository.interface';

export class DerivedConditionScoreFactory {
	static CreateDerivedConditionScore({
		id,
		elementId,
		unitId,
		manifestationId,
		surveyId,
		score,
		derivedScore,
		careScore,
		derivedCareScore,
		replacementIndex,
		created_at: createdAt,
		updated_at: updatedAt,
	}: DomainDerivedConditionScore): DerivedConditionScore {
		const derivedConditionScore = new DerivedConditionScore();
		derivedConditionScore.id = id;
		derivedConditionScore.elementId = elementId;
		derivedConditionScore.unitId = unitId;
		derivedConditionScore.manifestationId = manifestationId;
		derivedConditionScore.surveyId = surveyId;
		derivedConditionScore.score = score;
		derivedConditionScore.derivedScore = derivedScore;
		derivedConditionScore.careScore = careScore;
		derivedConditionScore.derivedCareScore = derivedCareScore;
		derivedConditionScore.replacementIndex = replacementIndex;
		derivedConditionScore.createdAt = createdAt instanceof Date ? createdAt.toUTCString() : null;
		derivedConditionScore.updatedAt = updatedAt instanceof Date ? updatedAt.toUTCString() : null;

		return derivedConditionScore;
	}
}
