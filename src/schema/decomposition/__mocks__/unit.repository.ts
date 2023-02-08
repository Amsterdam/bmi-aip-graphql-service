import { domainUnit } from '../__stubs__';

export const UnitRepository = jest.fn(() => ({
	createUnit: jest.fn(() => domainUnit),
	getUnits: jest.fn(() => [domainUnit]),
	deleteUnit: jest.fn(() => domainUnit),
	getUnitById: jest.fn(() => domainUnit),
	hasManifestations: jest.fn(() => false),
}));
