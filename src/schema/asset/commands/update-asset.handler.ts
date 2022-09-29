import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AssetRepository, DBAsset } from '../asset.repository';

import { UpdateAssetCommand } from './update-asset.command';

@CommandHandler(UpdateAssetCommand)
export class UpdateAssetHandler implements ICommandHandler<UpdateAssetCommand> {
	constructor(private repository: AssetRepository) {}

	public async execute(command: UpdateAssetCommand): Promise<DBAsset> {
		return this.repository.updateAsset(command.data);
	}
}
