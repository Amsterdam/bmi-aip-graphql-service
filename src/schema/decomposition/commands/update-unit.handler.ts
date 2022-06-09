import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UnitRepository } from '../unit.repository';
import { Unit } from '../types/unit.repository.interface';

import { UpdateUnitCommand } from './update-unit.command';

@CommandHandler(UpdateUnitCommand)
export class UpdateUnitHandler implements ICommandHandler<UpdateUnitCommand> {
	constructor(private repository: UnitRepository) {}

	public async execute(command: UpdateUnitCommand): Promise<Unit> {
		return this.repository.updateUnit(command.data);
	}
}
