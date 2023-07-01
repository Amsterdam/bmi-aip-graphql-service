import { SpanMeasuresSurvey } from './span-measures-survey.model';

describe('SpanMeasuresSurvey data', () => {
	test('constructs a SpanMeasuresSurvey instance', () => {
		const spanMeasuresSurveyData = new SpanMeasuresSurvey();
		spanMeasuresSurveyData.id = '9c612187-581b-4be3-902c-9e8035d1d3b7';
		spanMeasuresSurveyData.inspectionStandardData = { generalRemarks: '__TEST__' };
		spanMeasuresSurveyData.verifiedAuthor = '__AUTHOR_01__';
		spanMeasuresSurveyData.verifiedDate = null;

		expect(spanMeasuresSurveyData).toBeInstanceOf(SpanMeasuresSurvey);
	});
});
