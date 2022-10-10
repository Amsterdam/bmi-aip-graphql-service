import { Injectable } from '@nestjs/common';

import { NodeSurveyRepository } from './node-survey.repository';
import { NodeSurvey } from './models/node-survey.model';
import { NodeSurveyFactory } from './node-survey.factory';

@Injectable()
export class NodeSurveyService {
	public constructor(private readonly nodeSurveyRepo: NodeSurveyRepository) {}

	async getNodeSurvey(surveyId: string, supportSystemId: string): Promise<NodeSurvey> {
		return NodeSurveyFactory.CreateNodeSurvey(await this.nodeSurveyRepo.getNodeSurvey(surveyId, supportSystemId));
	}
}
