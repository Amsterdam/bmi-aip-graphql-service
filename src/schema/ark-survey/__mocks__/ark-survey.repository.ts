import { domainArkSurvey, ArkSurvey, domainSurvey, domainArkSurveyWithReachSegments } from '../__stubs__';

export const ArkSurveyRepository = jest.fn(() => ({
	createArkSurvey: jest.fn(() => ArkSurvey),
	updateArkSurvey: jest.fn(() => ArkSurvey),
	getArkSurvey: jest.fn(() => domainArkSurvey),
	updateSurvey: jest.fn(() => domainSurvey),
	findArkSurveysByAssetCode: jest.fn(() => [domainArkSurveyWithReachSegments, domainArkSurveyWithReachSegments]),
}));
