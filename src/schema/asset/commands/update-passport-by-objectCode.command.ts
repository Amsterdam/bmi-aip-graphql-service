import { AssetAttributesInput } from '../dto/asset-attributes.input';

export class UpdatePassportByObjectCodeCommand {
	public constructor(public readonly data: AssetAttributesInput) {}
}
