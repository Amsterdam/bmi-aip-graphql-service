import { nodeSurvey } from '../__stubs__';

export const NodeSurveyService = jest.fn(() => ({
	getNodeSurvey: jest.fn(() => nodeSurvey),
}));
