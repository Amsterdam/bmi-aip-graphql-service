import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CyclicMeasureRepository } from '../cyclic-measure.repository';
import { CyclicMeasure } from '../types/cyclic-measure.repository.interface';

import { DeleteCyclicMeasureCommand } from './delete-cyclic-measure.command';

@CommandHandler(DeleteCyclicMeasureCommand)
export class DeleteCyclicMeasureHandler implements ICommandHandler<DeleteCyclicMeasureCommand> {
	constructor(private repository: CyclicMeasureRepository) {}

	public async execute(command: DeleteCyclicMeasureCommand): Promise<CyclicMeasure> {
		return this.repository.deleteCyclicMeasure(command.identifier);
	}
}
