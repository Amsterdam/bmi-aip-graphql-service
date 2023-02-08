import { CreateArkSurveyInput } from '../dto/create-ark-survey.input';

export class CreateArkSurveyCommand {
	public constructor(public readonly data: CreateArkSurveyInput) {}
}
