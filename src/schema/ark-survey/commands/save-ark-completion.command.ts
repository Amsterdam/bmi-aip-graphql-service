import { SaveArkSurveyInput } from '../dto/save-ark-survey.input';

export class SaveArkCompletionCommand {
	public constructor(public readonly data: SaveArkSurveyInput) {}
}
