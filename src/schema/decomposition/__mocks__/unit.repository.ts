import { unit } from '../__stubs__';

export const UnitRepository = jest.fn(() => ({
	createUnit: jest.fn(() => unit),
	getUnits: jest.fn(() => [unit]),
}));
