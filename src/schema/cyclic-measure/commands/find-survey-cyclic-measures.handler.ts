import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CyclicMeasureService } from '../cyclic-measure.service';
import { CyclicMeasure } from '../models/cyclic-measure.model';
import { FindSurveyCyclicMeasuresCommand } from '../commands/find-survey-cyclic-measures.command';

// Afstemmen met Fortunato
@CommandHandler(FindSurveyCyclicMeasuresCommand)
export class FindSurveyCyclicMeasuresHandler implements ICommandHandler<FindSurveyCyclicMeasuresCommand> {
	constructor(private service: CyclicMeasureService) {}

	public async execute({ unitId }: FindSurveyCyclicMeasuresCommand): Promise<CyclicMeasure[]> {
		return this.service.getCyclicMeasures(unitId);
	}
}
