import { CreateAssetInput } from '../dto/create-asset.input';

export class CreateAssetCommand {
	public constructor(public readonly data: CreateAssetInput) {}
}
