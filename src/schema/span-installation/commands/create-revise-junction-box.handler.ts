import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { JunctionBoxRepository } from '../junction-box.repository';
import { JunctionBox } from '../types/junction-box.repository.interface';

import { CreateMissingJunctionBoxCommand } from './create-missing-junction-box.command';

@CommandHandler(CreateMissingJunctionBoxCommand)
export class CreateReviseJunctionBoxHandler implements ICommandHandler<CreateMissingJunctionBoxCommand> {
	constructor(private repository: JunctionBoxRepository) {}

	public async execute(command: CreateMissingJunctionBoxCommand): Promise<JunctionBox> {
		return this.repository.createReviseJunctionBox(command.data);
	}
}
