import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ArkSurveyGeographyDataRepository } from '../ark-survey-geography-data.repository';
import { ArkSurveyGeographyData } from '../types/ark-survey-geography-data.repository.interface';

import { UpdateArkSurveyGeographyDataCommand } from './update-ark-survey-geography-data.command';

@CommandHandler(UpdateArkSurveyGeographyDataCommand)
export class UpdateArkSurveyGeographyDataHandler implements ICommandHandler<UpdateArkSurveyGeographyDataCommand> {
	constructor(private repository: ArkSurveyGeographyDataRepository) {}

	public async execute(command: UpdateArkSurveyGeographyDataCommand): Promise<ArkSurveyGeographyData> {
		return this.repository.updateArkSurveyGeographyData(command.data);
	}
}
