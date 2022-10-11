import { junctionBoxSurvey } from '../__stubs__';

export const JunctionBoxSurveyService = jest.fn(() => ({
	getJunctionBoxSurvey: jest.fn(() => junctionBoxSurvey),
}));
