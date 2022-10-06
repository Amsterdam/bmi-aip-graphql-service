import { tensionWireSurvey } from '../__stubs__';

export const TensionWireSurveyService = jest.fn(() => ({
	getTensionWireSurvey: jest.fn(() => tensionWireSurvey),
}));
