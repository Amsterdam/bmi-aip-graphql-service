import { CreateNodeSurveyInput } from '../dto/create-node-survey.input';

export class CreateNodeSurveyCommand {
	public constructor(public readonly data: CreateNodeSurveyInput) {}
}
