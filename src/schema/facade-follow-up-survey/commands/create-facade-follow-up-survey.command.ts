import { CreateFacadeFollowUpSurveyInput } from '../dto/create-facade-follow-up-survey.input';

export class CreateFacadeFollowUpSurveyCommand {
	public constructor(public readonly data: CreateFacadeFollowUpSurveyInput) {}
}
