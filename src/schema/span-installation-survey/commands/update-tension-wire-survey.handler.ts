import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { TensionWireSurveyRepository } from '../tension-wire-survey.repository';
import { TensionWireSurvey } from '../models/tension-wire-survey.model';

import { UpdateTensionWireSurveyCommand } from './update-tension-wire-survey.command';

@CommandHandler(UpdateTensionWireSurveyCommand)
export class UpdateTensionWireSurveyHandler implements ICommandHandler<UpdateTensionWireSurveyCommand> {
	constructor(private repository: TensionWireSurveyRepository) {}

	public async execute(command: UpdateTensionWireSurveyCommand): Promise<TensionWireSurvey> {
		return this.repository.updateTensionWireSurvey(command.data);
	}
}
