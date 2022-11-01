import { domainMastSurvey } from '../__stubs__';

export const MastSurveyRepository = jest.fn(() => ({
	getMastSurvey: jest.fn(() => domainMastSurvey),
}));
