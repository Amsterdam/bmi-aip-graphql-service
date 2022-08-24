import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SurveyRepository } from '../survey.repository';
import { DbSurvey } from '../types/survey.repository.interface';

import { CreateSurveyCommand } from './create-survey.command';

@CommandHandler(CreateSurveyCommand)
export class CreateSurveyHandler implements ICommandHandler<CreateSurveyCommand> {
	constructor(private repository: SurveyRepository) {}

	public async execute(command: CreateSurveyCommand): Promise<DbSurvey> {
		return this.repository.createSurvey(command.data);
	}
}
