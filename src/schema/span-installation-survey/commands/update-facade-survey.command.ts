import { UpdateFacadeSurveyInput } from '../dto/update-facade-survey.input';

export class UpdateFacadeSurveyCommand {
	public constructor(public readonly data: UpdateFacadeSurveyInput) {}
}
