import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { FacadeFollowUpSurvey } from '../types/facade-follow-up-survey.repository.interface';
import { FacadeFollowUpSurveyRepository } from '../facade-follow-up-survey.repository';

import { SaveFacadeFollowUpSurveyCommand } from './save-facade-follow-up-survey.command';

@CommandHandler(SaveFacadeFollowUpSurveyCommand)
export class SaveFacadeFollowUpSurveyHandler implements ICommandHandler<SaveFacadeFollowUpSurveyCommand> {
	constructor(private repository: FacadeFollowUpSurveyRepository) {}

	public async execute(command: SaveFacadeFollowUpSurveyCommand): Promise<FacadeFollowUpSurvey> {
		return this.repository.saveFacadeFollowUpSurvey(command.data);
	}
}
