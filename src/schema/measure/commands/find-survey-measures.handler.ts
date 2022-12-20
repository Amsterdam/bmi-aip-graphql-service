import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { MeasureService } from '../measure.service';
import { Measure } from '../models/measure.model';
import { FindSurveyMeasuresCommand } from '../commands/find-survey-measures.command';

// Afstemmen met Fortunato
@CommandHandler(FindSurveyMeasuresCommand)
export class FindSurveyMeasuresHandler implements ICommandHandler<FindSurveyMeasuresCommand> {
	constructor(private service: MeasureService) {}

	public async execute({ unitId }: FindSurveyMeasuresCommand): Promise<Measure[]> {
		return this.service.getMeasures(unitId);
	}
}
