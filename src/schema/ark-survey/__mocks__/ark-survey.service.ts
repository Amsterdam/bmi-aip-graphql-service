import { ArkSurvey } from '../__stubs__';

export const ArkSurveyService = jest.fn(() => ({
	getArkSurveyData: jest.fn(() => [ArkSurvey, ArkSurvey]),
}));
