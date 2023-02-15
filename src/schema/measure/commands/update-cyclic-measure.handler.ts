import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CyclicMeasureRepository } from '../cyclic-measure.repository';
import { CyclicMeasure } from '../types/cyclic-measure.repository.interface';

import { UpdateCyclicMeasureCommand } from './update-cyclic-measure.command';

@CommandHandler(UpdateCyclicMeasureCommand)
export class UpdateCyclicMeasureHandler implements ICommandHandler<UpdateCyclicMeasureCommand> {
	constructor(private repository: CyclicMeasureRepository) {}

	public async execute(command: UpdateCyclicMeasureCommand): Promise<CyclicMeasure> {
		return this.repository.updateCyclicMeasure(command.data);
	}
}
