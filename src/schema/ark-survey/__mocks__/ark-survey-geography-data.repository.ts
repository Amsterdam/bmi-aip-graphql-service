import { domainArkSurveyGeographyData, ArkSurveyGeographyData } from '../__stubs__';

export const ArkSurveyGeographyDataRepository = jest.fn(() => ({
	createArkGeographyData: jest.fn(() => ArkSurveyGeographyData),
	getGeographyData: jest.fn(() => [domainArkSurveyGeographyData]),
}));
