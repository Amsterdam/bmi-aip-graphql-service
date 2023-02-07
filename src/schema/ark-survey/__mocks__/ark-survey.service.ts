import { ArkSurvey } from '../__stubs__';

export const ArkSurveyService = jest.fn(() => ({
	getArkSurvey: jest.fn(() => ArkSurvey),
}));
