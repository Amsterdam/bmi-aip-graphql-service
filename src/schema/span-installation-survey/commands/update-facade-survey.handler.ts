import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { FacadeSurveyRepository } from '../facade-survey.repository';
import { FacadeSurvey } from '../models/facade-survey.model';

import { UpdateFacadeSurveyCommand } from './update-facade-survey.command';

@CommandHandler(UpdateFacadeSurveyCommand)
export class UpdateFacadeSurveyHandler implements ICommandHandler<UpdateFacadeSurveyCommand> {
	constructor(private repository: FacadeSurveyRepository) {}

	public async execute(command: UpdateFacadeSurveyCommand): Promise<FacadeSurvey> {
		return this.repository.updateFacadeSurvey(command.data);
	}
}
