import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { JunctionBoxRepository } from '../junction-box.repository';
import { JunctionBox } from '../types/junction-box.repository.interface';

import { DeleteJunctionBoxCommand } from './delete-junction-box.command';

@CommandHandler(DeleteJunctionBoxCommand)
export class DeleteJunctionBoxHandler implements ICommandHandler<DeleteJunctionBoxCommand> {
	constructor(private repository: JunctionBoxRepository) {}

	public async execute(command: DeleteJunctionBoxCommand): Promise<JunctionBox> {
		return this.repository.deleteJunctionBox(command.identifier);
	}
}
