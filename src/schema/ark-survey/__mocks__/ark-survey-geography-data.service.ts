import { ArkSurveyGeographyData } from '../__stubs__';

export const ArkSurveyGeographyDataService = jest.fn(() => ({
	getGeographyData: jest.fn(() => [ArkSurveyGeographyData, ArkSurveyGeographyData]),
}));
