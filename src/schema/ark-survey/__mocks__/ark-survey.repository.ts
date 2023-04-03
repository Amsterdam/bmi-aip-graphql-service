import { domainArkSurvey, ArkSurvey, domainSurvey } from '../__stubs__';

export const ArkSurveyRepository = jest.fn(() => ({
	createArkSurvey: jest.fn(() => ArkSurvey),
	updateArkSurvey: jest.fn(() => ArkSurvey),
	getArkSurvey: jest.fn(() => domainArkSurvey),
	updateSurvey: jest.fn(() => domainSurvey),
}));
