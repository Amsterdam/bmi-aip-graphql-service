import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ObjectRepository } from '../object.repository';
import { Object } from '../types/object.repository.interface';

import { CreateObjectCommand } from './create-object.command';

@CommandHandler(CreateObjectCommand)
export class CreateObjectHandler implements ICommandHandler<CreateObjectCommand> {
	constructor(private repository: ObjectRepository) {}

	// eslint-disable-next-line @typescript-eslint/ban-types
	public async execute(command: CreateObjectCommand): Promise<Object> {
		return this.repository.createObject(command.data);
	}
}
