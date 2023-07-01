import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SpanMeasuresSurveyRepository } from '../span-measures-survey.repository';
import { SpanMeasuresSurvey } from '../types/span-measures-survey.repository.interface';

import { UpdateSpanMeasuresCompletionCommand } from './update-span-measures-completion.command';

@CommandHandler(UpdateSpanMeasuresCompletionCommand)
export class UpdateSpanMeasuresCompletionHandler implements ICommandHandler<UpdateSpanMeasuresCompletionCommand> {
	constructor(private repository: SpanMeasuresSurveyRepository) {}

	public async execute(command: UpdateSpanMeasuresCompletionCommand): Promise<SpanMeasuresSurvey> {
		console.log('hit the updateSpanMeasuresComplettionHandler');
		return this.repository.updateSpanMeasuresCompletion(command.data);
	}
}
