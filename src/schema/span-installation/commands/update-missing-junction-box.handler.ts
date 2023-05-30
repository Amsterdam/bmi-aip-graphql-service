import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { JunctionBoxRepository } from '../junction-box.repository';
import { JunctionBox } from '../types/junction-box.repository.interface';

import { UpdateMissingJunctionBoxCommand } from './update-missing-junction-box.command';

@CommandHandler(UpdateMissingJunctionBoxCommand)
export class UpdateMissingJunctionBoxHandler implements ICommandHandler<UpdateMissingJunctionBoxCommand> {
	constructor(private repository: JunctionBoxRepository) {}

	public async execute(command: UpdateMissingJunctionBoxCommand): Promise<JunctionBox> {
		return this.repository.reviseJunctionBox(command.data);
	}
}
