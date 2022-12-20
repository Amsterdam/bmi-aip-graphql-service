import { domainUnit, unit } from '../__stubs__';

export const UnitRepository = jest.fn(() => ({
	createUnit: jest.fn(() => unit),
	getUnits: jest.fn(() => [unit]),
	deleteUnit: jest.fn(() => domainUnit),
	hasManifestations: jest.fn(() => false),
}));
