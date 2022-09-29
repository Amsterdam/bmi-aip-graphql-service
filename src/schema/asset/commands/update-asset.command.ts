import { UpdateAssetInput } from '../dto/update-asset.input';

export class UpdateAssetCommand {
	public constructor(public readonly data: UpdateAssetInput) {}
}
