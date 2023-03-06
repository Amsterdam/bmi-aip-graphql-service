import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { FacadeFollowUpSurvey } from '../types/facade-follow-up-survey.repository.interface';
import { FacadeFollowUpSurveyRepository } from '../facade-follow-up-survey.repository';

import { CreateFacadeFollowUpSurveyCommand } from './create-facade-follow-up-survey.command';

@CommandHandler(CreateFacadeFollowUpSurveyCommand)
export class CreateFacadeFollowUpSurveyHandler implements ICommandHandler<CreateFacadeFollowUpSurveyCommand> {
	constructor(private repository: FacadeFollowUpSurveyRepository) {}

	public async execute(command: CreateFacadeFollowUpSurveyCommand): Promise<FacadeFollowUpSurvey> {
		return this.repository.createFacadeFollowUpSurvey(command.data);
	}
}
