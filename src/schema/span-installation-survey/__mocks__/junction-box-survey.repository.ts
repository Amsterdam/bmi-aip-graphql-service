import { domainJunctionBoxSurvey } from '../__stubs__';

export const JunctionBoxSurveyRepository = jest.fn(() => ({
	getJunctionBoxSurvey: jest.fn(() => domainJunctionBoxSurvey),
	getJunctionBoxSurveyOnPermanentId: jest.fn(() => domainJunctionBoxSurvey),
}));
