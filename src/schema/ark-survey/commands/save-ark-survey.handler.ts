import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ArkSurveyRepository } from '../ark-survey.repository';
import { ArkSurvey } from '../types/ark-survey.repository.interface';

import { SaveArkSurveyCommand } from './save-ark-survey.command';

@CommandHandler(SaveArkSurveyCommand)
export class SaveArkSurveyHandler implements ICommandHandler<SaveArkSurveyCommand> {
	constructor(private repository: ArkSurveyRepository) {}

	public async execute(command: SaveArkSurveyCommand): Promise<ArkSurvey> {
		return this.repository.saveArkSurvey(command.data);
	}
}
