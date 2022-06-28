import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ElementRepository } from '../element.repository';
import { Element } from '../types/element.repository.interface';

import { UpdateElementCommand } from './update-element.command';

@CommandHandler(UpdateElementCommand)
export class UpdateElementHandler implements ICommandHandler<UpdateElementCommand> {
	constructor(private repository: ElementRepository) {}

	public async execute(command: UpdateElementCommand): Promise<Element> {
		return this.repository.updateElement(command.data);
	}
}
