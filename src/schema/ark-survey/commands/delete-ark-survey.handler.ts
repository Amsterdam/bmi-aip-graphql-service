import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ArkSurveyRepository } from '../ark-survey.repository';
import { ArkSurvey } from '../types/ark-survey.repository.interface';

import { DeleteArkSurveyCommand } from './delete-ark-survey.command';

@CommandHandler(DeleteArkSurveyCommand)
export class DeleteArkSurveyHandler implements ICommandHandler<DeleteArkSurveyCommand> {
	constructor(private repository: ArkSurveyRepository) {}

	public async execute(command: DeleteArkSurveyCommand): Promise<ArkSurvey> {
		return this.repository.deleteArkSurvey(command.identifier);
	}
}
