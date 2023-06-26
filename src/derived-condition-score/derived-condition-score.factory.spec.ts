import { DerivedConditionScoreFactory } from './derived-condition-score.factory';
import { domainDerivedConditionScore } from './__stubs__';
import { DerivedConditionScore } from './models/derived-condition-score.model';

describe('DerivedConditionScore / Factory', () => {
	test('CreateDerivedConditionScore() constructs an instance of a DerivedConditionScore GraphQL model', () => {
		const result = DerivedConditionScoreFactory.CreateDerivedConditionScore(domainDerivedConditionScore);
		const object = {
			...domainDerivedConditionScore,
			createdAt: domainDerivedConditionScore.created_at ?? null,
			updatedAt: domainDerivedConditionScore.updated_at ?? null,
		};
		delete object.created_at;
		delete object.updated_at;
		expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(DerivedConditionScore);
	});
});
