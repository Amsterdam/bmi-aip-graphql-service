import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { MastSurveyRepository } from '../mast-survey.repository';
import { MastSurvey } from '../models/mast-survey.model';

import { UpdateMastSurveyCommand } from './update-mast-survey.command';

@CommandHandler(UpdateMastSurveyCommand)
export class UpdateMastSurveyHandler implements ICommandHandler<UpdateMastSurveyCommand> {
	constructor(private repository: MastSurveyRepository) {}

	public async execute(command: UpdateMastSurveyCommand): Promise<MastSurvey> {
		return this.repository.updateMastSurvey(command.data);
	}
}
