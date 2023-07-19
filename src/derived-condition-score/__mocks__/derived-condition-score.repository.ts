import { domainDerivedConditionScore } from '../__stubs__';

export const DerivedConditionScoreRepository = jest.fn(() => ({
	getDerivedConditionScore: jest.fn(() => domainDerivedConditionScore),
}));
