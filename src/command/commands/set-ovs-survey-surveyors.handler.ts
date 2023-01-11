import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { SetOvsSurveySurveyorsService } from '../set-ovs-survey-surveyors.service';
import { SetOvsSurveySurveyorsReturnType } from '../types';

import { SetOVSSurveySurveyorsCommand } from './set-ovs-survey-surveyors.command';

@CommandHandler(SetOVSSurveySurveyorsCommand)
export class SetOVSSurveySurveyorsHandler implements ICommandHandler<SetOVSSurveySurveyorsCommand> {
	constructor(private service: SetOvsSurveySurveyorsService) {}

	public async execute(command: SetOVSSurveySurveyorsCommand): Promise<SetOvsSurveySurveyorsReturnType> {
		return this.service.setOVSSurveySurveyors();
	}
}
