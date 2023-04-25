import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ArkSurveyRepository } from '../ark-survey.repository';
import { ArkSurvey } from '../types/ark-survey.repository.interface';

import { SaveArkCompletionCommand } from './save-ark-completion.command';

@CommandHandler(SaveArkCompletionCommand)
export class SaveArkCompletionHandler implements ICommandHandler<SaveArkCompletionCommand> {
	constructor(private repository: ArkSurveyRepository) {}

	public async execute(command: SaveArkCompletionCommand): Promise<ArkSurvey> {
		return this.repository.saveArkCompletion(command.data);
	}
}
