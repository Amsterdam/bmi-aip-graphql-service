import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UnitRepository } from '../unit.repository';
import { UnitFactory } from '../unit.factory';
import { Unit } from '../models/unit.model';

import { CreateUnitCommand } from './create-unit.command';

@CommandHandler(CreateUnitCommand)
export class CreateUnitHandler implements ICommandHandler<CreateUnitCommand> {
	constructor(private repository: UnitRepository) {}

	public async execute(command: CreateUnitCommand): Promise<Unit> {
		return UnitFactory.CreateUnit(await this.repository.createUnit(command.data));
	}
}
