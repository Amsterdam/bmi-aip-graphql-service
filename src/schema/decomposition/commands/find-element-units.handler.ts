import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Unit } from '../models/unit.model';
import { UnitService } from '../unit.service';

import { FindElementUnitsCommand } from './find-element-units.command';

@CommandHandler(FindElementUnitsCommand)
export class FindElementUnitsHandler implements ICommandHandler<FindElementUnitsCommand> {
	constructor(private service: UnitService) {}

	public async execute({ elementId }: FindElementUnitsCommand): Promise<Unit[]> {
		return this.service.getUnits(elementId);
	}
}
