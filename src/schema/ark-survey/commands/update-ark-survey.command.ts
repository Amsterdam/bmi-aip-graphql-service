import { UpdateArkSurveyInput } from '../dto/update-ark-survey.input';

export class UpdateArkSurveyCommand {
	public constructor(public readonly data: UpdateArkSurveyInput) {}
}
