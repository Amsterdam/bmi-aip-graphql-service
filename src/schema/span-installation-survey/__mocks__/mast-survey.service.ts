import { mastSurvey } from '../__stubs__';

export const MastSurveyService = jest.fn(() => ({
	getMastSurvey: jest.fn(() => mastSurvey),
}));
