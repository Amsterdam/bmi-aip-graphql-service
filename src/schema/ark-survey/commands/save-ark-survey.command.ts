import { SaveArkSurveyInput } from '../dto/save-ark-survey.input';

export class SaveArkSurveyCommand {
	public constructor(public readonly data: SaveArkSurveyInput) {}
}
