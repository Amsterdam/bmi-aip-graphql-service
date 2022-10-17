import { Prisma } from '@prisma/client';

import { CreateNodeSurveyInput } from '../dto/create-node-survey.input';
import { UpdateNodeSurveyInput } from '../dto/update-node-survey.input';

const nodeSurveys = Prisma.validator<Prisma.spanSupportSystemNodeSurveysArgs>()({
	select: {
		id: true,
		supportSystemId: true,
		nodeDamage: true,
		remarks: true,
		created_at: true,
		updated_at: true,
	},
});

export type NodeSurvey = Prisma.spanSupportSystemNodeSurveysGetPayload<typeof nodeSurveys>;

export interface INodeSurveyRepository {
	getNodeSurvey(surveyId: string, supportSystemId: string): Promise<NodeSurvey>;
	createNodeSurvey(input: CreateNodeSurveyInput): Promise<NodeSurvey>;
	updateNodeSurvey(input: UpdateNodeSurveyInput): Promise<NodeSurvey>;
}
