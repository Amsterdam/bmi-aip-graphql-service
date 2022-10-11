import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { MastSurveyRepository } from '../mast-survey.repository';
import { MastSurvey } from '../models/mast-survey.model';

import { CreateMastSurveyCommand } from './create-mast-survey.command';

@CommandHandler(CreateMastSurveyCommand)
export class CreateMastSurveyHandler implements ICommandHandler<CreateMastSurveyCommand> {
	constructor(private repository: MastSurveyRepository) {}

	public async execute(command: CreateMastSurveyCommand): Promise<MastSurvey> {
		return this.repository.createMastSurvey(command.data);
	}
}
