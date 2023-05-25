import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { JunctionBoxRepository } from '../junction-box.repository';
import { JunctionBox } from '../types/junction-box.repository.interface';

import { CreateReviseJunctionBoxCommand } from './create-revise-junction-box.command';

@CommandHandler(CreateReviseJunctionBoxCommand)
export class CreateReviseJunctionBoxHandler implements ICommandHandler<CreateReviseJunctionBoxCommand> {
	constructor(private repository: JunctionBoxRepository) {}

	public async execute(command: CreateReviseJunctionBoxCommand): Promise<JunctionBox> {
		return this.repository.createReviseJunctionBox(command.data);
	}
}
