import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { JunctionBoxRepository } from '../junction-box.repository';
import { JunctionBox } from '../types/junction-box.repository.interface';

import { UpdateJunctionBoxCommand } from './update-junction-box.command';

@CommandHandler(UpdateJunctionBoxCommand)
export class UpdateJunctionBoxHandler implements ICommandHandler<UpdateJunctionBoxCommand> {
	constructor(private repository: JunctionBoxRepository) {}

	public async execute(command: UpdateJunctionBoxCommand): Promise<JunctionBox> {
		return this.repository.updateJunctionBox(command.data);
	}
}
