import { asset } from '../__stubs__';

export const AssetService = jest.fn(() => ({
	getAssetById: jest.fn(() => asset),
}));
