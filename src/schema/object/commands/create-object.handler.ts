import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ObjectModel } from '../models/object.model';
import { ObjectService } from '../object.service';

import { CreateObjectCommand } from './create-object.command';

@CommandHandler(CreateObjectCommand)
export class CreateObjectHandler implements ICommandHandler<CreateObjectCommand> {
	constructor(private service: ObjectService) {}

	public async execute(command: CreateObjectCommand): Promise<ObjectModel> {
		return this.service.createObject(command.data);
	}
}
