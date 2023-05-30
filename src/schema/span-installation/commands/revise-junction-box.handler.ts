import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { JunctionBoxRepository } from '../junction-box.repository';
import { JunctionBox } from '../types/junction-box.repository.interface';

import { ReviseJunctionBoxCommand } from './revise-junction-box.command';

@CommandHandler(ReviseJunctionBoxCommand)
export class ReviseJunctionBoxHandler implements ICommandHandler<ReviseJunctionBoxCommand> {
	constructor(private repository: JunctionBoxRepository) {}

	public async execute(command: ReviseJunctionBoxCommand): Promise<JunctionBox> {
		return this.repository.reviseJunctionBox(command.data);
	}
}
