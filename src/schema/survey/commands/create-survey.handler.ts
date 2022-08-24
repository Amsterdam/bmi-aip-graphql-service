import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Survey } from '../models/survey.model';
import { SurveyService } from '../survey.service';

import { CreateSurveyCommand } from './create-survey.command';

@CommandHandler(CreateSurveyCommand)
export class CreateSurveyHandler implements ICommandHandler<CreateSurveyCommand> {
	constructor(private repository: SurveyService) {}

	public async execute(command: CreateSurveyCommand): Promise<Survey> {
		return this.repository.createSurvey(command.data);
	}
}
