import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ObjectRepository } from '../object.repository';
import { DbObject } from '../types/object.repository.interface';

import { CreateObjectCommand } from './create-object.command';

@CommandHandler(CreateObjectCommand)
export class CreateObjectHandler implements ICommandHandler<CreateObjectCommand> {
	constructor(private repository: ObjectRepository) {}

	public async execute(command: CreateObjectCommand): Promise<DbObject> {
		return this.repository.createObject(command.data);
	}
}
