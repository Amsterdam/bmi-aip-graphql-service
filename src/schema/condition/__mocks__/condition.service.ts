import { condition1, condition2 } from '../__stubs__';

export const ConditionService = jest.fn(() => ({
	findConditions: jest.fn(() => [condition1, condition2]),
	findConditionById: jest.fn(() => condition1),
}));
