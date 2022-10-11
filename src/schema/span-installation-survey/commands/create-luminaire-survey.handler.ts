import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { LuminaireSurveyRepository } from '../luminaire-survey.repository';
import { LuminaireSurvey } from '../models/luminaire-survey.model';

import { CreateLuminaireSurveyCommand } from './create-luminaire-survey.command';

@CommandHandler(CreateLuminaireSurveyCommand)
export class CreateLuminaireSurveyHandler implements ICommandHandler<CreateLuminaireSurveyCommand> {
	constructor(private repository: LuminaireSurveyRepository) {}

	public async execute(command: CreateLuminaireSurveyCommand): Promise<LuminaireSurvey> {
		return this.repository.createLuminaireSurvey(command.data);
	}
}
