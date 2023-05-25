import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { JunctionBoxRepository } from '../junction-box.repository';
import { JunctionBox } from '../types/junction-box.repository.interface';

import { UpdateReviseJunctionBoxCommand } from './update-revise-junction-box.command';

@CommandHandler(UpdateReviseJunctionBoxCommand)
export class UpdateReviseJunctionBoxHandler implements ICommandHandler<UpdateReviseJunctionBoxCommand> {
	constructor(private repository: JunctionBoxRepository) {}

	public async execute(command: UpdateReviseJunctionBoxCommand): Promise<JunctionBox> {
		return this.repository.updateReviseJunctionBox(command.data);
	}
}
