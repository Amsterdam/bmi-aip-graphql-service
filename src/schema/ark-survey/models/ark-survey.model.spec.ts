import { ArkSurvey } from './ark-survey.model';

describe('ARKSurvey Geography data', () => {
	test('constructs a ArkSurvey instance', () => {
		const arkSurveyModel = new ArkSurvey();
		arkSurveyModel.id = '71c5450a-c0a3-48ea-adbb-ea435a8804d5';
		arkSurveyModel.surveyId = '388ecaaa-c6c2-4613-aa14-f206cf577ca7';
		arkSurveyModel.arkGeographyStart = {
			type: 'Point',
			coordinates: [52.370302853062604, 4.893996915500548],
		};
		arkSurveyModel.arkGeographyRDStart = {
			coordinates: [116211.88, 487352.77],
			type: 'Point',
		};
		arkSurveyModel.arkGeographyEnd = {
			type: 'Point',
			coordinates: [52.370302853062604, 4.893996915500548],
		};
		arkSurveyModel.arkGeographyRDEnd = {
			coordinates: [116211.88, 487352.77],
			type: 'Point',
		};
		arkSurveyModel.id = '9c612187-581b-4be3-902c-9e8035d1d3b7';
		arkSurveyModel.preparedAuthor = '__AUTHOR_01__';
		arkSurveyModel.preparedDate = undefined;
		arkSurveyModel.verifiedAuthor = '__VERIVIER_01__';
		arkSurveyModel.verifiedDate = undefined;
		arkSurveyModel.inspectionStandardData = { remarks: '__TEST__' };
		expect(arkSurveyModel).toBeInstanceOf(ArkSurvey);
	});
});
