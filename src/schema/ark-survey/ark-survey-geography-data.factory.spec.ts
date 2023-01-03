import { ArkSurveyGeographyDataFactory } from './ark-survey-geography-data.factory';
import { ArkSurveyGeographyData } from './models/ark-survey-geography-data.model';
import { domainArkSurveyGeographyData } from './__stubs__';

describe('ARK / ArkSurveyGeographyData Factory', () => {
	test('CreateArkSurveyGeographyData() constructs an instance of a ArkSurveyGeographyData GraphQL model', () => {
		const result = ArkSurveyGeographyDataFactory.createArkSurveyGeographyData(domainArkSurveyGeographyData);
		const object = {
			...domainArkSurveyGeographyData,
		};

		expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(ArkSurveyGeographyData);
	});
});
