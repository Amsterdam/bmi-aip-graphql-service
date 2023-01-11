import { CreateSurveyInput } from '../dto/create-survey.input';

export class CreateSurveyCommand {
	public constructor(public readonly data: CreateSurveyInput) {}
}
