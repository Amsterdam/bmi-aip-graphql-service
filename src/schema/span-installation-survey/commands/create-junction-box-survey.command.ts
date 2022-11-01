import { CreateJunctionBoxSurveyInput } from '../dto/create-junction-box-survey.input';

export class CreateJunctionBoxSurveyCommand {
	public constructor(public readonly data: CreateJunctionBoxSurveyInput) {}
}
