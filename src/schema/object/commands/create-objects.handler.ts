import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ObjectRepository } from '../object.repository';

import { CreateObjectsCommand } from './create-objects.command';

@CommandHandler(CreateObjectsCommand)
export class CreateObjectsHandler implements ICommandHandler<CreateObjectsCommand> {
	constructor(private repository: ObjectRepository) {}

	public async execute(command: CreateObjectsCommand): Promise<number> {
		return this.repository.createManyObjects(command.data);
	}
}
