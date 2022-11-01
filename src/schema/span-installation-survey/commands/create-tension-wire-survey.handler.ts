import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { TensionWireSurveyRepository } from '../tension-wire-survey.repository';
import { TensionWireSurvey } from '../models/tension-wire-survey.model';

import { CreateTensionWireSurveyCommand } from './create-tension-wire-survey.command';

@CommandHandler(CreateTensionWireSurveyCommand)
export class CreateTensionWireSurveyHandler implements ICommandHandler<CreateTensionWireSurveyCommand> {
	constructor(private repository: TensionWireSurveyRepository) {}

	public async execute(command: CreateTensionWireSurveyCommand): Promise<TensionWireSurvey> {
		return this.repository.createTensionWireSurvey(command.data);
	}
}
