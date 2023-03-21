import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UnitRepository } from '../unit.repository';
import { UnitFactory } from '../unit.factory';
import { Unit } from '../models/unit.model';

import { UpdateUnitCommand } from './update-unit.command';

@CommandHandler(UpdateUnitCommand)
export class UpdateUnitHandler implements ICommandHandler<UpdateUnitCommand> {
	constructor(private repository: UnitRepository) {}

	public async execute(command: UpdateUnitCommand): Promise<Unit> {
		return UnitFactory.CreateUnit(await this.repository.updateUnit(command.data));
	}
}
