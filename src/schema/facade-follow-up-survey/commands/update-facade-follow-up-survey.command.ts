import { UpdateFacadeFollowUpSurveyInput } from '../dto/update-facade-follow-up-survey.input';

export class UpdateFacadeFollowUpSurveyCommand {
	public constructor(public readonly data: UpdateFacadeFollowUpSurveyInput) {}
}
