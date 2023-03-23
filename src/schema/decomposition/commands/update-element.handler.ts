import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ElementRepository } from '../element.repository';
import { ElementFactory } from '../element.factory';
import { Element } from '../models/element.model';

import { UpdateElementCommand } from './update-element.command';

@CommandHandler(UpdateElementCommand)
export class UpdateElementHandler implements ICommandHandler<UpdateElementCommand> {
	constructor(private repository: ElementRepository) {}

	public async execute(command: UpdateElementCommand): Promise<Element> {
		return ElementFactory.CreateElement(await this.repository.updateElement(command.data));
	}
}
