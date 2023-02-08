import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CyclicMeasureRepository } from '../cyclic-measure.repository';
import { CyclicMeasure } from '../types/cyclic-measure.repository.interface';
import { CreateCyclicMeasureCommand } from '../commands/create-cyclic-measure.command';

@CommandHandler(CreateCyclicMeasureCommand)
export class CreateCyclicMeasureHandler implements ICommandHandler<CreateCyclicMeasureCommand> {
	constructor(private repository: CyclicMeasureRepository) {}

	public async execute(command: CreateCyclicMeasureCommand): Promise<CyclicMeasure> {
		return this.repository.createCyclicMeasure(command.data);
	}
}
