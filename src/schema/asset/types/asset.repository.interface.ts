import { DBAsset } from '../asset.repository';
import { CreateAssetInput } from '../dto/create-asset.input';
import { UpdateAssetInput } from '../dto/update-asset.input';
import { AssetAttributesInput } from '../dto/asset-attributes.input';

export interface IAssetRepository {
	getWritableAssetCodesForCompanyId(companyId: string): Promise<string[]>;
	getAssetById(id: string): Promise<DBAsset>;
	createAsset(input: CreateAssetInput): Promise<DBAsset>;
	updateAsset(input: UpdateAssetInput): Promise<DBAsset>;
	updateAssetPassportByObjectCode(input: AssetAttributesInput): Promise<DBAsset>;
}
