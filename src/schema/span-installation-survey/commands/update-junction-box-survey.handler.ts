import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { JunctionBoxSurveyRepository } from '../junction-box-survey.repository';
import { JunctionBoxSurvey } from '../models/junction-box-survey.model';

import { UpdateJunctionBoxSurveyCommand } from './update-junction-box-survey.command';

@CommandHandler(UpdateJunctionBoxSurveyCommand)
export class UpdateJunctionBoxSurveyHandler implements ICommandHandler<UpdateJunctionBoxSurveyCommand> {
	constructor(private repository: JunctionBoxSurveyRepository) {}

	public async execute(command: UpdateJunctionBoxSurveyCommand): Promise<JunctionBoxSurvey> {
		return this.repository.updateJunctionBoxSurvey(command.data);
	}
}
