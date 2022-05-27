import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UnitRepository } from '../unit.repository';
import { Unit } from '../types/unit.repository.interface';

import { CreateUnitCommand } from './create-unit.command';

@CommandHandler(CreateUnitCommand)
export class CreateUnitHandler implements ICommandHandler<CreateUnitCommand> {
	constructor(private repository: UnitRepository) {}

	public async execute(command: CreateUnitCommand): Promise<Unit> {
		return this.repository.createUnit(command.data);
	}
}
