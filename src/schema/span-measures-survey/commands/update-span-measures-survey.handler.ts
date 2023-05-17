import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SpanMeasuresSurveyRepository } from '../span-measures-survey.repository';
import { SpanMeasuresSurvey } from '../types/span-measures-survey.repository.interface';

import { UpdateSpanMeasuresSurveyCommand } from './update-span-measures-survey.command';

@CommandHandler(UpdateSpanMeasuresSurveyCommand)
export class UpdateSpanMeasuresSurveyHandler implements ICommandHandler<UpdateSpanMeasuresSurveyCommand> {
	constructor(private repository: SpanMeasuresSurveyRepository) {}

	public async execute(command: UpdateSpanMeasuresSurveyCommand): Promise<SpanMeasuresSurvey> {
		return this.repository.updateSpanMeasuresSurvey(command.data);
	}
}
