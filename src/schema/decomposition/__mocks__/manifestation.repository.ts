import { domainManifestation } from '../__stubs__';

export const ManifestationRepository = jest.fn(() => ({
	createManifestation: jest.fn(() => domainManifestation),
	getManifestations: jest.fn(() => [domainManifestation]),
	getManifestationById: jest.fn(() => domainManifestation),
	deleteManifestationsForUnit: jest.fn(),
}));
