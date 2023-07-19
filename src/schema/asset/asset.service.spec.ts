import { MockedObjectDeep } from 'ts-jest';

import { AssetRepository } from './asset.repository';
import { AssetService } from './asset.service';
import { AssetFactory } from './asset.factory';
import { dbAsset } from './__stubs__/dbAsset';
import { asset } from './__stubs__/asset';

const assetRepoMock: MockedObjectDeep<AssetRepository> = {
	getAssetByCode: jest.fn().mockResolvedValue(dbAsset),
	getAssetById: jest.fn().mockResolvedValue(dbAsset),
	...(<any>{}),
};

jest.mock('./asset.factory');

describe('assetService', () => {
	test('getAssetByCode()', async () => {
		AssetFactory.FromDBAsset = jest.fn().mockResolvedValue(asset);
		const service = new AssetService(assetRepoMock);
		expect(await service.getAssetByCode('BRU001')).toEqual(asset);
		expect(AssetFactory.FromDBAsset).toHaveBeenCalledWith(dbAsset);
	});
	test('getAssetById()', async () => {
		AssetFactory.FromDBAsset = jest.fn().mockResolvedValue(asset);
		const service = new AssetService(assetRepoMock);
		expect(await service.getAssetById('a3c1027b-ac94-4991-b3e7-2eb96c2e0ca2')).toEqual(asset);
		expect(AssetFactory.FromDBAsset).toHaveBeenCalledWith(dbAsset);
	});
});
