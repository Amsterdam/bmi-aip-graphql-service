import { CreateTensionWireSurveyInput } from '../dto/create-tension-wire-survey.input';

export class CreateTensionWireSurveyCommand {
	public constructor(public readonly data: CreateTensionWireSurveyInput) {}
}
