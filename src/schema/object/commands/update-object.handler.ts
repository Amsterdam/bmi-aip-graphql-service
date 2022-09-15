import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ObjectRepository } from '../object.repository';

import { UpdateObjectCommand } from './update-object.command';

@CommandHandler(UpdateObjectCommand)
export class UpdateObjectHandler implements ICommandHandler<UpdateObjectCommand> {
	constructor(private repository: ObjectRepository) {}

	public async execute(command: UpdateObjectCommand): Promise<string> {
		return this.repository.updatePassportByObjectCode(command.data);
	}
}
