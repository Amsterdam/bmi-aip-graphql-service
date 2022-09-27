import { survey1, domainSurvey } from '../__stubs__';

export const SurveyRepository = jest.fn(() => ({
	createSurvey: jest.fn(() => survey1),
	getSurvey: jest.fn(() => [domainSurvey]),
}));
