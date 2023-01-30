import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { FailureModeRepository } from '../failure-mode.repository';
import { FailureMode } from '../types/failure-mode.repository.interface';
import { CreateFailureModeCommand } from '../commands/create-failure-mode.command';

@CommandHandler(CreateFailureModeCommand)
export class CreateFailureModeHandler implements ICommandHandler<CreateFailureModeCommand> {
	constructor(private repository: FailureModeRepository) {}

	public async execute(command: CreateFailureModeCommand): Promise<FailureMode> {
		return this.repository.createFailureMode(command.data);
	}
}
