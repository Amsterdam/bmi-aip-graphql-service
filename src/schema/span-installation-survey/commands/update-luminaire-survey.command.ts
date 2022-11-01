import { UpdateLuminaireSurveyInput } from '../dto/update-luminaire-survey.input';

export class UpdateLuminaireSurveyCommand {
	public constructor(public readonly data: UpdateLuminaireSurveyInput) {}
}
