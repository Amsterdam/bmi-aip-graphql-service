import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { LuminaireSurveyRepository } from '../luminaire-survey.repository';
import { LuminaireSurvey } from '../models/luminaire-survey.model';

import { UpdateLuminaireSurveyCommand } from './update-luminaire-survey.command';

@CommandHandler(UpdateLuminaireSurveyCommand)
export class UpdateLuminaireSurveyHandler implements ICommandHandler<UpdateLuminaireSurveyCommand> {
	constructor(private repository: LuminaireSurveyRepository) {}

	public async execute(command: UpdateLuminaireSurveyCommand): Promise<LuminaireSurvey> {
		return this.repository.updateLuminaireSurvey(command.data);
	}
}
