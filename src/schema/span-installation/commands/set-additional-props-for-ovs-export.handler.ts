import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AdditionalPropsForOVSExportRepository } from '../additional-props-for-ovs-export.repository';

import { SetAdditionalPropsForOVSExportCommand } from './set-additional-props-for-ovs-export.command';

@CommandHandler(SetAdditionalPropsForOVSExportCommand)
export class SetAdditionalPropsForOvsExportHandler implements ICommandHandler<SetAdditionalPropsForOVSExportCommand> {
	constructor(private repo: AdditionalPropsForOVSExportRepository) {}

	public async execute(command: SetAdditionalPropsForOVSExportCommand): Promise<string> {
		return this.repo.setAdditionalPropsForOVSExport(command.data);
	}
}
