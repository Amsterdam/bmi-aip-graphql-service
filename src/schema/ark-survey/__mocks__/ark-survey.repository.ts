import { domainArkSurvey, ArkSurvey } from '../__stubs__';

export const ArkSurveyRepository = jest.fn(() => ({
	createArkSurvey: jest.fn(() => ArkSurvey),
	getArkSurveyData: jest.fn(() => [domainArkSurvey]),
}));
