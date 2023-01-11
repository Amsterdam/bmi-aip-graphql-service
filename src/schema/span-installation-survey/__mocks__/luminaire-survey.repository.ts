import { domainLuminaireSurvey } from '../__stubs__';

export const LuminaireSurveyRepository = jest.fn(() => ({
	getLuminaireSurvey: jest.fn(() => domainLuminaireSurvey),
}));
