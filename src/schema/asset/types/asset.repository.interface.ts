import { CreateAssetInput } from '../dto/create-asset.input';
import { DBAsset } from '../asset.repository';

export interface IAssetRepository {
	getWritableAssetCodesForCompanyId(companyId: string): Promise<string[]>;
	createAsset(input: CreateAssetInput): Promise<DBAsset>;
}
