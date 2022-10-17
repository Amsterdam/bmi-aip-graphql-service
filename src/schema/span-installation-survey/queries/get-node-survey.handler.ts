import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

import { NodeSurvey } from '../models/node-survey.model';
import { NodeSurveyService } from '../node-survey.service';

import { GetNodeSurveyQuery } from './get-node-survey.query';

@QueryHandler(GetNodeSurveyQuery)
export class GetNodeSurveyHandler implements IQueryHandler<GetNodeSurveyQuery> {
	constructor(private service: NodeSurveyService) {}

	async execute(query: GetNodeSurveyQuery): Promise<NodeSurvey> {
		return this.service.getNodeSurvey(query.supportSystemId);
	}
}
