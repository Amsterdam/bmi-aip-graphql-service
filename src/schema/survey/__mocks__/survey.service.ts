import { survey1, survey2 } from '../__stubs__';

export const SurveyService = jest.fn(() => ({
	getSurveys: jest.fn(() => [survey1, survey2]),
	getSurvey: jest.fn(() => survey1),
}));
