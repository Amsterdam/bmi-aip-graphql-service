import { NodeSurvey as DomainNodeSurvey } from '../types/node-survey.repository.interface';
import { CreateNodeSurveyInput } from '../dto/create-node-survey.input';
import { UpdateNodeSurveyInput } from '../dto/update-node-survey.input';
import { NodeSurvey } from '../models/node-survey.model';

const nodeSurveyRaw: Omit<DomainNodeSurvey, 'id'> = {
	supportSystemId: '83ca470b-768a-49a7-a59f-4fe5da5620cf',
	nodeDamage: true,
	remarks: '__REMARKS__',
	created_at: undefined,
	updated_at: undefined,
};

export const createNodeSurveyInput = Object.keys(nodeSurveyRaw).reduce((input, key) => {
	input[key] = nodeSurveyRaw[key];
	return input;
}, new CreateNodeSurveyInput());

const updateNodeSurvey = new UpdateNodeSurveyInput();
updateNodeSurvey.id = '796229bf-1b54-4bb7-a7d4-acb0dc3062df';
export const updateNodeSurveyInput = Object.keys(nodeSurveyRaw).reduce((input, key) => {
	input[key] = nodeSurveyRaw[key];
	return input;
}, updateNodeSurvey);

export const domainNodeSurvey: DomainNodeSurvey = {
	id: '796229bf-1b54-4bb7-a7d4-acb0dc3062df',
	...nodeSurveyRaw,
};

export const nodeSurvey = Object.keys(nodeSurveyRaw).reduce((acc, key) => {
	acc[key] = nodeSurveyRaw[key];
	return acc;
}, new NodeSurvey());
