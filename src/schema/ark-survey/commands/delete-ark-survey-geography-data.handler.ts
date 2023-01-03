import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ArkSurveyGeographyDataRepository } from '../ark-survey-geography-data.repository';
import { ArkSurveyGeographyData } from '../types/ark-survey-geography-data.repository.interface';

import { DeleteArkSurveyGeographyDataCommand } from './delete-ark-survey-geography-data.command';

@CommandHandler(DeleteArkSurveyGeographyDataCommand)
export class DeleteArkSurveyGeographyDataHandler implements ICommandHandler<DeleteArkSurveyGeographyDataCommand> {
	constructor(private repository: ArkSurveyGeographyDataRepository) {}

	public async execute(command: DeleteArkSurveyGeographyDataCommand): Promise<ArkSurveyGeographyData> {
		return this.repository.deleteArkSurveyGeographyData(command.identifier);
	}
}
