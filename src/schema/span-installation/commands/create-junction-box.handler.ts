import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { JunctionBoxRepository } from '../junction-box.repository';
import { JunctionBox } from '../types/junction-box.repository.interface';

import { CreateJunctionBoxCommand } from './create-junction-box.command';

@CommandHandler(CreateJunctionBoxCommand)
export class CreateJunctionBoxHandler implements ICommandHandler<CreateJunctionBoxCommand> {
	constructor(private repository: JunctionBoxRepository) {}

	public async execute(command: CreateJunctionBoxCommand): Promise<JunctionBox> {
		return this.repository.createJunctionBox(command.data);
	}
}
