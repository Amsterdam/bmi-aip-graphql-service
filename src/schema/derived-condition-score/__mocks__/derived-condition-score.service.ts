import { derivedConditionScore } from '../__stubs__';

export const DerivedConditionScoreService = jest.fn(() => ({
	getDerivedConditionScore: jest.fn(() => derivedConditionScore),
}));
