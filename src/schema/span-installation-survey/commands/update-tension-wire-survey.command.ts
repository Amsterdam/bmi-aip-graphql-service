import { UpdateTensionWireSurveyInput } from '../dto/update-tension-wire-survey.input';

export class UpdateTensionWireSurveyCommand {
	public constructor(public readonly data: UpdateTensionWireSurveyInput) {}
}
