import { domainCondition, condition1 } from '../__stubs__';

export const ConditionRepository = jest.fn(() => ({
	createCondition: jest.fn(() => condition1),
	getCondition: jest.fn(() => domainCondition),
}));
