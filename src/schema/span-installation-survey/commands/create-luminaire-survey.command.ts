import { CreateLuminaireSurveyInput } from '../dto/create-luminaire-survey.input';

export class CreateLuminaireSurveyCommand {
	public constructor(public readonly data: CreateLuminaireSurveyInput) {}
}
