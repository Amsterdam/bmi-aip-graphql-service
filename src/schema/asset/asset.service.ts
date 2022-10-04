import { Injectable } from '@nestjs/common';

import { Asset } from './models/asset.model';
import { AssetRepository } from './asset.repository';
import { AssetFactory } from './asset.factory';
import { CreateAssetInput } from './dto/create-asset.input';

@Injectable()
export class AssetService {
	constructor(private readonly assetRepo: AssetRepository) {}

	async createAsset(input: CreateAssetInput): Promise<Asset> {
		return AssetFactory.FromDBAsset(await this.assetRepo.createAsset(input));
	}

	async getAssetByCode(code: string): Promise<Asset> {
		const asset = await this.assetRepo.getAssetByCode(code);
		return AssetFactory.FromDBAsset(asset);
	}

	// async getAssets(assetType: string): Promise<ObjectModel[]> {
	// 	return (await this.assetRepo.getAssetByAssetTypeId(assetType)).map((asset) =>
	// 		ObjectFactory.CreateObject(asset),
	// 	);
	// }
}
