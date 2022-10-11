import { UpdateMastSurveyInput } from '../dto/update-mast-survey.input';

export class UpdateMastSurveyCommand {
	public constructor(public readonly data: UpdateMastSurveyInput) {}
}
