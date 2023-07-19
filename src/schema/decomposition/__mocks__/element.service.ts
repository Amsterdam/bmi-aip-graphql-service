import { element1, element2, unit1 } from '../__stubs__';

export const ElementService = jest.fn(() => ({
	getElements: jest.fn(() => [element1, element2]),
	getElementById: jest.fn(() => element1),
	getElementWithUnits: jest.fn(() => [{ ...element1, units: [{ ...unit1 }] }]),
}));
