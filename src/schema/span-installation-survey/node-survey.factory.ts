import { NodeSurvey as DomainNodeSurvey } from './types/node-survey.repository.interface';
import { NodeSurvey } from './models/node-survey.model';

export class NodeSurveyFactory {
	static CreateNodeSurvey({
		id,
		supportSystemId,
		nodeDamage,
		remarks,
		created_at: createdAt,
		updated_at: updatedAt,
	}: DomainNodeSurvey): NodeSurvey {
		const nodeSurvey = new NodeSurvey();
		nodeSurvey.id = id;
		nodeSurvey.supportSystemId = supportSystemId;
		nodeSurvey.nodeDamage = nodeDamage;
		nodeSurvey.remarks = remarks;
		nodeSurvey.createdAt = createdAt instanceof Date ? createdAt.toUTCString() : null;
		nodeSurvey.updatedAt = updatedAt instanceof Date ? updatedAt.toUTCString() : null;
		return nodeSurvey;
	}
}
