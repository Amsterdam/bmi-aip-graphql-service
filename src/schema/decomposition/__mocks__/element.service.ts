import { element1, element2 } from '../__stubs__';

export const ElementService = jest.fn(() => ({
	getElements: jest.fn(() => [element1, element2]),
	getElementById: jest.fn(() => element1),
}));
