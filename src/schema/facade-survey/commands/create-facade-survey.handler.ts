import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { FacadeSurvey } from '../types/facade-survey.repository.interface';
import { FacadeSurveyRepository } from '../facade-survey.repository';

import { CreateFacadeSurveyCommand } from './create-facade-survey.command';

@CommandHandler(CreateFacadeSurveyCommand)
export class CreateFacadeSurveyHandler implements ICommandHandler<CreateFacadeSurveyCommand> {
	constructor(private repository: FacadeSurveyRepository) {}

	public async execute(command: CreateFacadeSurveyCommand): Promise<FacadeSurvey> {
		return this.repository.createFacadeSurvey(command.data);
	}
}
