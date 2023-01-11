import { MockedObjectDeep } from 'ts-jest';

import { AssetRepository } from '../asset.repository';
import { assetInput, dbAsset, domainAsset } from '../__stubs__';
import { AssetService } from '../asset.service';

import { CreateAssetCommand } from './create-asset.command';
import { CreateAssetHandler } from './create-asset.handler';

const assetRepoMock: MockedObjectDeep<AssetRepository> = {
	createAsset: jest.fn().mockResolvedValue(dbAsset),
	...(<any>{}),
};

describe('CreateSurveyHandler', () => {
	test('executes command', async () => {
		const command = new CreateAssetCommand(assetInput);
		const service = new AssetService(assetRepoMock);

		const result = await new CreateAssetHandler(service).execute(command);

		expect(assetRepoMock.createAsset).toHaveBeenCalledTimes(1);
		expect(assetRepoMock.createAsset).toHaveBeenCalledWith(assetInput);

		expect(result).toEqual(domainAsset);
	});
});
