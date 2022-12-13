import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UnitService } from '../unit.service';
import { Unit } from '../models/unit.model';

import { DeleteUnitCommand } from './delete-unit.command';

@CommandHandler(DeleteUnitCommand)
export class DeleteUnitHandler implements ICommandHandler<DeleteUnitCommand> {
	constructor(private service: UnitService) {}

	public async execute(command: DeleteUnitCommand): Promise<Unit> {
		return this.service.deleteUnit(command.identifier);
	}
}
