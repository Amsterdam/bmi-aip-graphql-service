import { asset } from '../__stubs__';

export const AssetRepository = jest.fn(() => ({
	createAsset: jest.fn(() => asset),
}));
