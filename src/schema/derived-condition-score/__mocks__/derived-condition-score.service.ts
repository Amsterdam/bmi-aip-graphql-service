import { derivedConditionScore } from '../__stubs__';

export const DerivedConditionScoreService = jest.fn(() => ({
	getDerivedConditionScoresByElementId: jest.fn(() => derivedConditionScore),
}));
