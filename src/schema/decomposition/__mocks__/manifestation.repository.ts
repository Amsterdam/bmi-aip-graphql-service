import { manifestation } from '../__stubs__';

export const ManifestationRepository = jest.fn(() => ({
	createManifestation: jest.fn(() => manifestation),
	getManifestations: jest.fn(() => [manifestation]),
	deleteManifestationsForUnit: jest.fn(),
}));
