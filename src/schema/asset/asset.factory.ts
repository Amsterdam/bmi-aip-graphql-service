import { Asset } from './models/asset.model';
import type { DBAsset } from './asset.repository';

export class AssetFactory {
	static FromDBAsset({ id, code, status, clientCompanyId, ownerCompanyId }: DBAsset): Asset {
		const asset = new Asset();
		asset.id = id;
		asset.code = code;
		asset.status = status;
		asset.clientCompanyId = clientCompanyId;
		asset.ownerCompanyId = ownerCompanyId;
		return asset;
	}

	static FromCode(code: string): Asset {
		const asset = new Asset();
		asset.code = code;
		return asset;
	}
}
