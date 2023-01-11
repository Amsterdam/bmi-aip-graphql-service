import { CreateMastSurveyInput } from '../dto/create-mast-survey.input';

export class CreateMastSurveyCommand {
	public constructor(public readonly data: CreateMastSurveyInput) {}
}
