import { UpdateJunctionBoxSurveyInput } from '../dto/update-junction-box-survey.input';

export class UpdateJunctionBoxSurveyCommand {
	public constructor(public readonly data: UpdateJunctionBoxSurveyInput) {}
}
