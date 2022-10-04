import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Asset } from '../models/asset.model';
import { AssetService } from '../asset.service';

import { CreateAssetCommand } from './create-asset.command';

@CommandHandler(CreateAssetCommand)
export class CreateAssetHandler implements ICommandHandler<CreateAssetCommand> {
	constructor(private service: AssetService) {}

	public async execute(command: CreateAssetCommand): Promise<Asset> {
		return this.service.createAsset(command.data);
	}
}
