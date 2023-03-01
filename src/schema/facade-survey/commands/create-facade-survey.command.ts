import { CreateFacadeSurveyInput } from '../dto/create-facade-survey.input';

export class CreateFacadeSurveyCommand {
	public constructor(public readonly data: CreateFacadeSurveyInput) {}
}
