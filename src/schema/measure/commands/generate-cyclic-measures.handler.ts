import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CyclicMeasureRepository } from '../cyclic-measure.repository';
import { CyclicMeasure } from '../types/cyclic-measure.repository.interface';
import { GenerateCyclicMeasuresCommand } from '../commands/generate-cyclic-measures.command';

@CommandHandler(GenerateCyclicMeasuresCommand)
export class GenerateCyclicMeasuresHandler implements ICommandHandler<GenerateCyclicMeasuresCommand> {
	constructor(private repository: CyclicMeasureRepository) {}

	public async execute(command: GenerateCyclicMeasuresCommand): Promise<CyclicMeasure[]> {
		return this.repository.generateCyclicMeasureForUnit(command.data);
	}
}
