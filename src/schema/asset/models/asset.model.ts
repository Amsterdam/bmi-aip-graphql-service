import { AssetStatuses } from '../../../types';

export class Asset {
	public id: string;

	public gisibId: number;

	public name: string;

	public code: string | null;

	public location: string | null;

	public status: keyof typeof AssetStatuses | null;

	public ownerCompanyId: string;

	public clientCompanyId: string;
}
