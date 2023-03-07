import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SurveyService } from '../survey.service';

import { FindInspectionStandardDataByIdCommand } from './find-inspection-standard-data-by-id.command';

@CommandHandler(FindInspectionStandardDataByIdCommand)
export class FindInspectionStandardDataByIdHandler implements ICommandHandler<FindInspectionStandardDataByIdCommand> {
	constructor(private service: SurveyService) {}

	public async execute({ id }: FindInspectionStandardDataByIdCommand): Promise<JSON> {
		return this.service.findInspectionStandardDataById(id);
	}
}
