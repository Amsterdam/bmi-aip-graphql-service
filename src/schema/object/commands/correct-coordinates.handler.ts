import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ObjectRepository } from '../object.repository';

import { CorrectCoordinatesCommand } from './correct-coordinates.command';

@CommandHandler(CorrectCoordinatesCommand)
export class CorrectCoordinatesHandler implements ICommandHandler<CorrectCoordinatesCommand> {
	constructor(private repo: ObjectRepository) {}

	public async execute(command: CorrectCoordinatesCommand): Promise<string> {
		return this.repo.correctCoordinates(command.data);
	}
}
