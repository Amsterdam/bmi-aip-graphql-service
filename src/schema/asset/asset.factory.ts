import { GisibAsset } from '../../gisib/types/GisibAsset';
import { GisibFeature } from '../../gisib/types/GisibFeature';
import { AssetStatuses } from '../../types';

import { Asset } from './models/asset.model';
import type { DBAsset } from './asset.repository';

export class AssetFactory {
	static FromDBAsset({ id, code, status, clientCompanyId, ownerCompanyId }: DBAsset): Asset {
		const asset = new Asset();
		asset.id = id;
		asset.code = code;
		asset.status = (status as keyof typeof AssetStatuses) || null;
		asset.clientCompanyId = clientCompanyId;
		asset.ownerCompanyId = ownerCompanyId;
		return asset;
	}

	static FromCode(code: string): Asset {
		const asset = new Asset();
		asset.code = code;
		return asset;
	}

	/**
	 * TODO Once a decision is made on the role GISIB will play in relation to AIP this can be refined/completed
	 */
	static FromGisibAsset({ properties: { Id, Objectnaam, Status } }: GisibFeature<GisibAsset>): Asset {
		const asset = new Asset();
		asset.gisibId = Id;
		asset.name = Objectnaam;
		asset.status = (Status?.Description as keyof typeof AssetStatuses) || null;
		return asset;
	}
}
