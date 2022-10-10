import { UpdateNodeSurveyInput } from '../dto/update-node-survey.input';

export class UpdateNodeSurveyCommand {
	public constructor(public readonly data: UpdateNodeSurveyInput) {}
}
