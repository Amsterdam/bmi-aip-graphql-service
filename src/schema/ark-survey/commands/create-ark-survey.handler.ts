import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ArkSurvey } from '../types/ark-survey.repository.interface';
import { ArkSurveyRepository } from '../ark-survey.repository';

import { CreateArkSurveyCommand } from './create-ark-survey.command';

@CommandHandler(CreateArkSurveyCommand)
export class CreateArkSurveyHandler implements ICommandHandler<CreateArkSurveyCommand> {
	constructor(private repository: ArkSurveyRepository) {}

	public async execute(command: CreateArkSurveyCommand): Promise<ArkSurvey> {
		return this.repository.createArkSurvey(command.data);
	}
}
