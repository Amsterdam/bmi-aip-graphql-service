import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ElementService } from '../element.service';
import { Element } from '../models/element.model';

import { DeleteElementCommand } from './delete-element.command';

@CommandHandler(DeleteElementCommand)
export class DeleteElementHandler implements ICommandHandler<DeleteElementCommand> {
	constructor(private service: ElementService) {}

	public async execute(command: DeleteElementCommand): Promise<Element> {
		return this.service.deleteElement(command.identifier);
	}
}
