import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ElementRepository } from '../element.repository';
import { Element } from '../types/element.repository.interface';

import { CreateElementCommand } from './create-element.command';

@CommandHandler(CreateElementCommand)
export class CreateElementHandler implements ICommandHandler<CreateElementCommand> {
	constructor(private repository: ElementRepository) {}

	public async execute(command: CreateElementCommand): Promise<Element> {
		return this.repository.createElement(command.data);
	}
}
