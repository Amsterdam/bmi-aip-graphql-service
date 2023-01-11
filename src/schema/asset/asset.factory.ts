import { GisibAsset } from '../../gisib/types/GisibAsset';
import { GisibFeature } from '../../gisib/types/GisibFeature';
import { AssetStatuses } from '../../types';

import { Asset } from './models/asset.model';
import type { DBAsset } from './asset.repository';

export class AssetFactory {
	static FromDBAsset(dbAsset: DBAsset): Asset {
		const asset = new Asset();
		asset.id = dbAsset.id;
		asset.name = dbAsset.name;
		asset.code = dbAsset.code;
		asset.location = dbAsset.location;
		asset.latitude = dbAsset.latitude?.toNumber();
		asset.longitude = dbAsset.longitude?.toNumber();
		asset.status = (dbAsset.status as keyof typeof AssetStatuses) || null;
		asset.clientCompanyId = dbAsset.clientCompanyId;
		asset.ownerCompanyId = dbAsset.ownerCompanyId;
		asset.updatedOn = dbAsset.updatedOn?.toUTCString();
		asset.compositionIsVisible = dbAsset.compositionIsVisible;
		asset.clientCompanyId = dbAsset.clientCompanyId;
		asset.operatorCompanyId = dbAsset.operatorCompanyId;
		asset.surveyorCompanyId = dbAsset.surveyorCompanyId;
		asset.objectTypeId = dbAsset.objectTypeId;
		asset.created_at = dbAsset.created_at?.toUTCString();
		asset.updated_at = dbAsset.updated_at?.toUTCString();
		asset.inspectionStandardId = dbAsset.inspectionStandardId;
		asset.ownerCompanyId = dbAsset.ownerCompanyId;
		asset.customerVersion = dbAsset.customerVersion;
		asset.isPublic = dbAsset.isPublic;
		asset.isDemo = dbAsset.isDemo;
		asset.siteId = dbAsset.siteId;
		asset.constructionYear = dbAsset.constructionYear;
		asset.externalRefId = dbAsset.externalRefId;
		asset.useage = dbAsset.useage;
		asset.managementOrganization = dbAsset.managementOrganization;
		asset.shapeSrid = dbAsset.shapeSrid;
		asset.effortCategory = dbAsset.effortCategory;
		asset.effortCalculation = dbAsset.effortCalculation;
		asset.trafficType = dbAsset.trafficType;
		asset.mainMaterial = dbAsset.mainMaterial;
		asset.marineInfrastrutureType = dbAsset.marineInfrastrutureType;
		asset.length = dbAsset.length?.toNumber();
		asset.width = dbAsset.width?.toNumber();
		asset.squareMeters = dbAsset.squareMeters?.toNumber();
		asset.attributes = JSON.stringify(dbAsset.attributes);
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
