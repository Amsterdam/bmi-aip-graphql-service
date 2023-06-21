import { DerivedConditionScore } from './derived-condition-score.model';

describe('Model / DerivedConditionScore', () => {
	test('constructs a DerivedConditionScore instance', () => {
		const derivedConditionScore = new DerivedConditionScore();

		derivedConditionScore.score = '4';
		derivedConditionScore.createdAt = null;
		derivedConditionScore.updatedAt = null;

		expect(derivedConditionScore).toEqual({
			score: '4',
			createdAt: null,
			updatedAt: null,
		});
	});
});
