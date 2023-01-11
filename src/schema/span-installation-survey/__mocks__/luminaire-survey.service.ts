import { mastSurvey } from '../__stubs__';

export const LuminaireSurveyService = jest.fn(() => ({
	getLuminaireSurvey: jest.fn(() => mastSurvey),
}));
