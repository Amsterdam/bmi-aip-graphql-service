import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { FacadeFollowUpSurvey } from '../types/facade-follow-up-survey.repository.interface';
import { FacadeFollowUpSurveyRepository } from '../facade-follow-up-survey.repository';

import { UpdateFacadeFollowUpSurveyCommand } from './update-facade-follow-up-survey.command';

@CommandHandler(UpdateFacadeFollowUpSurveyCommand)
export class UpdateFacadeFollowUpSurveyHandler implements ICommandHandler<UpdateFacadeFollowUpSurveyCommand> {
	constructor(private repository: FacadeFollowUpSurveyRepository) {}

	public async execute(command: UpdateFacadeFollowUpSurveyCommand): Promise<FacadeFollowUpSurvey> {
		return this.repository.updateFacadeFollowUpSurvey(command.data);
	}
}
