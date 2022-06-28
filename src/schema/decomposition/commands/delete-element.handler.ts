import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ElementRepository } from '../element.repository';
import { Element } from '../types/element.repository.interface';

import { DeleteElementCommand } from './delete-element.command';

@CommandHandler(DeleteElementCommand)
export class DeleteElementHandler implements ICommandHandler<DeleteElementCommand> {
	constructor(private repository: ElementRepository) {}

	public async execute(command: DeleteElementCommand): Promise<Element> {
		return this.repository.deleteElement(command.identifier);
	}
}
