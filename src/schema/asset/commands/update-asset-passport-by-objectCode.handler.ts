import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AssetRepository, DBAsset } from '../asset.repository';

import { UpdateAssetPassportByObjectCodeCommand } from './update-asset-passport-by-objectCode.command';

@CommandHandler(UpdateAssetPassportByObjectCodeCommand)
export class UpdateAssetPassportByObjectCodeHandler implements ICommandHandler<UpdateAssetPassportByObjectCodeCommand> {
	constructor(private repository: AssetRepository) {}

	public async execute(command: UpdateAssetPassportByObjectCodeCommand): Promise<DBAsset> {
		return this.repository.updateAssetPassportByObjectCode(command.data);
	}
}
