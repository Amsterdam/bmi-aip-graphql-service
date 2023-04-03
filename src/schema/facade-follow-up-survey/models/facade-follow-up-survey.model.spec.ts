import { FacadeFollowUpSurvey } from './facade-follow-up-survey.model';

describe('FacadeFollowUpSurvey data', () => {
	test('constructs a FacadeFollowUpSurvey instance', () => {
		const facadeFollowUpSurveyData = new FacadeFollowUpSurvey();
		facadeFollowUpSurveyData.id = '9c612187-581b-4be3-902c-9e8035d1d3b7';
		facadeFollowUpSurveyData.preparedAuthor = '__AUTHOR_01__';
		facadeFollowUpSurveyData.preparedDate = undefined;
		facadeFollowUpSurveyData.verifiedAuthor = '__VERIVIER_01__';
		facadeFollowUpSurveyData.verifiedDate = undefined;
		facadeFollowUpSurveyData.inspectionStandardData = { remarks: '__TEST__' };

		expect(facadeFollowUpSurveyData).toBeInstanceOf(FacadeFollowUpSurvey);
	});
});
