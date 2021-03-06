import { MockedObjectDeep } from 'ts-jest';

import { AssetRepository } from './asset.repository';
import { AssetService } from './asset.service';
import { AssetFactory } from './asset.factory';
import { dbAsset } from './__stubs__/dbAsset';
import { asset } from './__stubs__/asset';

const assetRepoMock: MockedObjectDeep<AssetRepository> = {
	getAssetByCode: jest.fn().mockResolvedValue(dbAsset),
	...(<any>{}),
};

jest.mock('./asset.factory');

describe('UserService', () => {
	test('getUser()', async () => {
		AssetFactory.FromDBAsset = jest.fn().mockResolvedValue(asset);
		const service = new AssetService(assetRepoMock);
		expect(await service.getAssetByCode('BRU001')).toEqual(asset);
		expect(AssetFactory.FromDBAsset).toHaveBeenCalledWith(dbAsset);
	});
});
