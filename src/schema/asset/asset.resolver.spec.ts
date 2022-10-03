import { MockedObjectDeep } from 'ts-jest';
import { CommandBus } from '@nestjs/cqrs';

import { AssetResolver } from './asset.resolver';
import { asset, assetInput } from './__stubs__';
import { CreateAssetCommand } from './commands/create-asset.command';
import { AssetService } from './asset.service';

jest.mock('./asset.service');
jest.mock('./asset.repository');

const getCommandBusMock = (): MockedObjectDeep<CommandBus> => ({
	execute: jest.fn((command: any) => {
		switch (command.constructor.name) {
			case CreateAssetCommand.name:
				return asset;
		}
	}),
	...(<any>{}),
});

const assetServiceMock: MockedObjectDeep<AssetService> = {
	...(<any>{}),
};

describe('Asset / Resolver', () => {
	describe('createAsset', () => {
		test('create a asset', async () => {
			const commandBusMock = getCommandBusMock();
			const resolver = new AssetResolver(assetServiceMock, commandBusMock);
			const result = await resolver.createAsset(assetInput);
			expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
			expect(commandBusMock.execute).toHaveBeenCalledWith(new CreateAssetCommand(assetInput));
			expect(typeof result.id).toBe('string');
		});
	});
});
