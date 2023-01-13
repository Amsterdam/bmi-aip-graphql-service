import { ArkSurvey } from './ark-survey.model';

describe('ARKSurvey Geography data', () => {
	test('constructs a ArkSurvey instance', () => {
		const geographyData = new ArkSurvey();
		geographyData.id = '71c5450a-c0a3-48ea-adbb-ea435a8804d5';
		geographyData.surveyId = '388ecaaa-c6c2-4613-aa14-f206cf577ca7';
		geographyData.arkGeographyStart = {
			type: 'Point',
			coordinates: [52.370302853062604, 4.893996915500548],
		};
		geographyData.arkGeographyRDStart = {
			coordinates: [116211.88, 487352.77],
			type: 'Point',
		};
		geographyData.arkGeographyEnd = {
			type: 'Point',
			coordinates: [52.370302853062604, 4.893996915500548],
		};
		geographyData.arkGeographyRDEnd = {
			coordinates: [116211.88, 487352.77],
			type: 'Point',
		};
		expect(geographyData).toBeInstanceOf(ArkSurvey);
	});
});
