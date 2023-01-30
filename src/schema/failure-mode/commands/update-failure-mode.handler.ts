import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { FailureModeRepository } from '../failure-mode.repository';
import { FailureMode } from '../types/failure-mode.repository.interface';
import { UpdateFailureModeCommand } from '../commands/update-failure-mode.command';

@CommandHandler(UpdateFailureModeCommand)
export class UpdateFailureModeHandler implements ICommandHandler<UpdateFailureModeCommand> {
	constructor(private repository: FailureModeRepository) {}

	public async execute(command: UpdateFailureModeCommand): Promise<FailureMode> {
		return this.repository.updateFailureMode(command.data);
	}
}
