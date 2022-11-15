import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CommandService } from '../command.service';
import { CommandReturnType } from '../types';

import { SetOVSSurveySurveyorsCommand } from './set-ovs-survey-surveyors.command';

@CommandHandler(SetOVSSurveySurveyorsCommand)
export class SetOVSSurveySurveyorsHandler implements ICommandHandler<SetOVSSurveySurveyorsCommand> {
	constructor(private service: CommandService) {}

	public async execute(command: SetOVSSurveySurveyorsCommand): Promise<CommandReturnType> {
		return this.service.setOVSSurveySurveyors();
	}
}
