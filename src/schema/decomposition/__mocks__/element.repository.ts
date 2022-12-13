import { domainElement, element1 } from '../__stubs__';

export const ElementRepository = jest.fn(() => ({
	createElement: jest.fn(() => element1),
	getElements: jest.fn(() => [domainElement]),
	deleteElement: jest.fn(() => domainElement),
	hasUnits: jest.fn(() => false),
}));
