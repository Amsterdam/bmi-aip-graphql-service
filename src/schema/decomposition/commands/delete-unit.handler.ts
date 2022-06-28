import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UnitRepository } from '../unit.repository';
import { Unit } from '../types/unit.repository.interface';

import { DeleteUnitCommand } from './delete-unit.command';

@CommandHandler(DeleteUnitCommand)
export class DeleteUnitHandler implements ICommandHandler<DeleteUnitCommand> {
	constructor(private repository: UnitRepository) {}

	public async execute(command: DeleteUnitCommand): Promise<Unit> {
		return this.repository.deleteUnit(command.identifier);
	}
}
