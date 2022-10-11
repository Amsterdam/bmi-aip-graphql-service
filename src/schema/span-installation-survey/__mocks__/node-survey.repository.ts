import { domainNodeSurvey } from '../__stubs__';

export const NodeSurveyRepository = jest.fn(() => ({
	getNodeSurvey: jest.fn(() => domainNodeSurvey),
}));
