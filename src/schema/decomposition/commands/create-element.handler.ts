import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ElementRepository } from '../element.repository';
import { ElementFactory } from '../element.factory';
import { Element } from '../models/element.model';

import { CreateElementCommand } from './create-element.command';

@CommandHandler(CreateElementCommand)
export class CreateElementHandler implements ICommandHandler<CreateElementCommand> {
	constructor(private repository: ElementRepository) {}

	public async execute(command: CreateElementCommand): Promise<Element> {
		return ElementFactory.CreateElement(await this.repository.createElement(command.data));
	}
}
