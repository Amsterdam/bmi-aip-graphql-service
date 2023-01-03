import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ArkSurveyGeographyData } from '../types/ark-survey-geography-data.repository.interface';
import { ArkSurveyGeographyDataRepository } from '../ark-survey-geography-data.repository';

import { CreateArkSurveyGeographyDataCommand } from './create-ark-survey-geography-data.command';

@CommandHandler(CreateArkSurveyGeographyDataCommand)
export class CreateArkSurveyGeographyDataHandler implements ICommandHandler<CreateArkSurveyGeographyDataCommand> {
	constructor(private repository: ArkSurveyGeographyDataRepository) {}

	public async execute(command: CreateArkSurveyGeographyDataCommand): Promise<ArkSurveyGeographyData> {
		return this.repository.createArkSurveyGeographyData(command.data);
	}
}
