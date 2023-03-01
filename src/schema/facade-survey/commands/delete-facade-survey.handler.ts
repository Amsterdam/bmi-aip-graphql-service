import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { FacadeSurveyRepository } from '../facade-survey.repository';
import { FacadeSurvey } from '../types/facade-survey.repository.interface';

import { DeleteFacadeSurveyCommand } from './delete-facade-survey.command';

@CommandHandler(DeleteFacadeSurveyCommand)
export class DeleteFacadeSurveyHandler implements ICommandHandler<DeleteFacadeSurveyCommand> {
	constructor(private repository: FacadeSurveyRepository) {}

	public async execute(command: DeleteFacadeSurveyCommand): Promise<FacadeSurvey> {
		return this.repository.deleteFacadeSurvey(command.surveyId);
	}
}
