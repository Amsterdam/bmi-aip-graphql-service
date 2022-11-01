import { AssetAttributesInput } from '../dto/asset-attributes.input';

export class UpdateAssetPassportByObjectCodeCommand {
	public constructor(public readonly data: AssetAttributesInput) {}
}
