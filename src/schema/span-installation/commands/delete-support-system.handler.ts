import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SupportSystemRepository } from '../support-system.repository';
import { SupportSystem } from '../types/support-system.repository.interface';

import { DeleteSupportSystemCommand } from './delete-support-system.command';

@CommandHandler(DeleteSupportSystemCommand)
export class DeleteSupportSystemHandler implements ICommandHandler<DeleteSupportSystemCommand> {
	constructor(private repository: SupportSystemRepository) {}

	public async execute(command: DeleteSupportSystemCommand): Promise<SupportSystem> {
		return this.repository.deleteSupportSystem(command.identifier);
	}
}
