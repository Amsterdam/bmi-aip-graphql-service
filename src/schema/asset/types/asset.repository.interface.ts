import { CreateAssetInput } from '../dto/create-asset.input';
import { DBAsset } from '../asset.repository';
import { UpdateAssetInput } from '../dto/update-asset.input';

export interface IAssetRepository {
	getWritableAssetCodesForCompanyId(companyId: string): Promise<string[]>;
	createAsset(input: CreateAssetInput): Promise<DBAsset>;
	updateAsset(input: UpdateAssetInput): Promise<DBAsset>;
}
