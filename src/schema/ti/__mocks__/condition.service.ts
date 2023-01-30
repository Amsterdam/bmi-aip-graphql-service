import { condition1, condition2 } from '../__stubs__';

export const ConditionService = jest.fn(() => ({
	getConditions: jest.fn(() => [condition1, condition2]),
}));
