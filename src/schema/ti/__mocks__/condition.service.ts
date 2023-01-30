import { condition } from '../__stubs__';

export const ConditionService = jest.fn(() => ({
	getCondition: jest.fn(() => condition),
}));
