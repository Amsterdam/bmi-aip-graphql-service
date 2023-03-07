import { SaveFacadeFollowUpSurveyInput } from '../dto/save-facade-follow-up-survey.input';

export class SaveFacadeFollowUpSurveyCommand {
	public constructor(public readonly data: SaveFacadeFollowUpSurveyInput) {}
}
