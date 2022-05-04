import { Injectable } from '@nestjs/common';

import { Asset } from './models/asset.model';
import { AssetRepository } from './asset.repository';
import { AssetFactory } from './asset.factory';

@Injectable()
export class AssetService {
	constructor(private readonly assetRepo: AssetRepository) {}

	async getAssetByCode(code: string): Promise<Asset> {
		const asset = await this.assetRepo.getAssetByCode(code);
		return AssetFactory.FromDBAsset(asset);
	}
}
