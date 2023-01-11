import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ArkSurveyRepository } from '../ark-survey.repository';
import { ArkSurvey } from '../types/ark-survey.repository.interface';

import { UpdateArkSurveyCommand } from './update-ark-survey.command';

@CommandHandler(UpdateArkSurveyCommand)
export class UpdateArkSurveyHandler implements ICommandHandler<UpdateArkSurveyCommand> {
	constructor(private repository: ArkSurveyRepository) {}

	public async execute(command: UpdateArkSurveyCommand): Promise<ArkSurvey> {
		return this.repository.updateArkSurvey(command.data);
	}
}
