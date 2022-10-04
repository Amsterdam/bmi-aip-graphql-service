import { AssetStatuses } from '../../../types';

export class Asset {
	public id: string;

	public gisibId: number;

	public name: string;

	public code: string | null;

	public location: string | null;

	public latitude: number | null;

	public longitude: number | null;

	public updatedOn: string | null;

	public compositionIsVisible: boolean;

	public clientCompanyId: string | null;

	public operatorCompanyId: string | null;

	public status: keyof typeof AssetStatuses | null;

	public ownerCompanyId: string;

	public objectTypeId: string;

	public inspectionStandardId: string | null;

	public created_at: string | null;

	public updated_at: string | null;

	public customerVersion: string | null;

	public externalRefId: string | null;

	public managementOrganization: string | null;

	public shape: string | null;

	public useage: string | null;

	public siteId: string | null;

	public surveyorCompanyId: string;

	public isPublic: boolean | null;

	public isDemo: boolean | null;

	public constructionYear: number | null;

	public shapeSrid: number | null;

	public effortCategory: string | null;

	public effortCalculation: number | null;

	public length: number | null;

	public width: number | null;

	public squareMeters: number | null;

	public trafficType: string | null;

	public mainMaterial: string | null;

	public marineInfrastrutureType: string | null;

	public attributes: string | null;
}
