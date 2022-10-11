import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AssetRepository, DBAsset } from '../asset.repository';

import { UpdatePassportByObjectCodeCommand } from './update-passport-by-objectCode.command';

@CommandHandler(UpdatePassportByObjectCodeCommand)
export class UpdatePassportByObjectCodeHandler implements ICommandHandler<UpdatePassportByObjectCodeCommand> {
	constructor(private repository: AssetRepository) {}

	public async execute(command: UpdatePassportByObjectCodeCommand): Promise<DBAsset> {
		return this.repository.updatePassportByObjectCode(command.data);
	}
}
