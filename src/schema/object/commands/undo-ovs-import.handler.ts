import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ObjectRepository } from '../object.repository';

import { UndoOVSImportCommand } from './undo-ovs-import.command';

@CommandHandler(UndoOVSImportCommand)
export class UndoOVSImportHandler implements ICommandHandler<UndoOVSImportCommand> {
	constructor(private repo: ObjectRepository) {}

	public async execute(command: UndoOVSImportCommand): Promise<string> {
		return this.repo.undoOVSImport();
	}
}
