import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { FacadeFollowUpSurveyRepository } from '../facade-follow-up-survey.repository';
import { FacadeFollowUpSurvey } from '../types/facade-follow-up-survey.repository.interface';

import { DeleteFacadeFollowUpSurveyCommand } from './delete-facade-follow-up-survey.command';

@CommandHandler(DeleteFacadeFollowUpSurveyCommand)
export class DeleteFacadeFollowUpSurveyHandler implements ICommandHandler<DeleteFacadeFollowUpSurveyCommand> {
	constructor(private repository: FacadeFollowUpSurveyRepository) {}

	public async execute(command: DeleteFacadeFollowUpSurveyCommand): Promise<FacadeFollowUpSurvey> {
		return this.repository.deleteFacadeFollowUpSurvey(command.surveyId);
	}
}
