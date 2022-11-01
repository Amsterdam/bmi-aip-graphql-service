import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { JunctionBoxSurveyRepository } from '../junction-box-survey.repository';
import { JunctionBoxSurvey } from '../models/junction-box-survey.model';

import { CreateJunctionBoxSurveyCommand } from './create-junction-box-survey.command';

@CommandHandler(CreateJunctionBoxSurveyCommand)
export class CreateJunctionBoxSurveyHandler implements ICommandHandler<CreateJunctionBoxSurveyCommand> {
	constructor(private repository: JunctionBoxSurveyRepository) {}

	public async execute(command: CreateJunctionBoxSurveyCommand): Promise<JunctionBoxSurvey> {
		return this.repository.createJunctionBoxSurvey(command.data);
	}
}
