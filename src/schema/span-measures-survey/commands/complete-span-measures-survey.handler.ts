import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SpanMeasuresSurveyRepository } from '../span-measures-survey.repository';
import { SpanMeasuresSurvey } from '../types/span-measures-survey.repository.interface';

import { CompleteSpanMeasuresSurveyCommand } from './complete-span-measures-survey.command';

@CommandHandler(CompleteSpanMeasuresSurveyCommand)
export class CompleteSpanMeasuresSurveyHandler implements ICommandHandler<CompleteSpanMeasuresSurveyCommand> {
	constructor(private repository: SpanMeasuresSurveyRepository) {}

	public async execute(command: CompleteSpanMeasuresSurveyCommand): Promise<SpanMeasuresSurvey> {
		return this.repository.completeSpanMeasuresSurvey(command.data);
	}
}
