import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CyclicMeasureRepository } from '../cyclic-measure.repository';
import { CyclicMeasure } from '../models/cyclic-measure.model';
import { GenerateCyclicMeasuresCommand } from '../commands/generate-cyclic-measures.command';
import { CyclicMeasureFactory } from '../cyclic-measure.factory';

@CommandHandler(GenerateCyclicMeasuresCommand)
export class GenerateCyclicMeasuresHandler implements ICommandHandler<GenerateCyclicMeasuresCommand> {
	constructor(private repository: CyclicMeasureRepository) {}

	public async execute(command: GenerateCyclicMeasuresCommand): Promise<CyclicMeasure[]> {
		return (await this.repository.generateCyclicMeasures(command.surveyId)).map((measure) =>
			CyclicMeasureFactory.CreateCyclicMeasure(measure),
		);
	}
}
