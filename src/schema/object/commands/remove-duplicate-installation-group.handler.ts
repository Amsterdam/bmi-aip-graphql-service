import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ObjectService } from '../object.service';

import { RemoveDuplicateInstallationGroupCommand } from './remove-duplicate-installation-group.command';

@CommandHandler(RemoveDuplicateInstallationGroupCommand)
export class RemoveDuplicateInstallationGroupHandler
	implements ICommandHandler<RemoveDuplicateInstallationGroupCommand>
{
	constructor(private service: ObjectService) {}

	public async execute(command: RemoveDuplicateInstallationGroupCommand): Promise<boolean> {
		return this.service.removeDuplicateInstallationGroup(command.installationGroupId, command.targetRemoved);
	}
}
