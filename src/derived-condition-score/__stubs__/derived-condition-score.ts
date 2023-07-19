import { DerivedConditionScore } from '../models/derived-condition-score.model';
import { DerivedConditionScore as DomainDerivedConditionScore } from '../types/derived-condition-score.repository.interface';
import { DerivedConditionScoreFactory } from '../derived-condition-score.factory';

const derivedConditionScore1 = new DerivedConditionScore();
derivedConditionScore1.id = '842cbc36-c28a-5066-c669-6a32af707576';
derivedConditionScore1.score = '4';

export { derivedConditionScore1 };

const derivedConditionScoreRaw: Omit<DomainDerivedConditionScore, 'id'> = {
	score: '4',
	created_at: undefined,
	updated_at: undefined,
	elementId: '',
	unitId: '',
	manifestationId: '',
	surveyId: '',
	derivedScore: '',
	replacementIndex: 0,
	careScore: '',
	derivedCareScore: '',
};

export const domainDerivedConditionScore: DomainDerivedConditionScore = {
	elementId: '842cbc36-c28a-5066-c669-6a32af707576',
	...derivedConditionScoreRaw,
	id: '',
};

export const derivedConditionScore =
	DerivedConditionScoreFactory.CreateDerivedConditionScore(domainDerivedConditionScore);
