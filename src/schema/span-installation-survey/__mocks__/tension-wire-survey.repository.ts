import { domainTensionWireSurvey } from '../__stubs__';

export const TensionWireSurveyRepository = jest.fn(() => ({
	getTensionWireSurvey: jest.fn(() => domainTensionWireSurvey),
}));
