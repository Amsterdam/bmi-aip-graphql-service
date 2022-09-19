import { SurveyFactory } from './survey.factory';
import { domainSurvey, survey } from './__stubs__';
import { Survey } from './models/survey.model';

describe('SurveyFactory', () => {
	test('CreateSurvey() constructs an instance of an Survey GraphQL model', () => {
		const result = SurveyFactory.CreateSurvey(domainSurvey);
		expect(result).toBeInstanceOf(Survey);
		expect(result).toEqual(expect.objectContaining(survey));
	});

	test('CreateElementInput', () => {
		const result = SurveyFactory.CreateSurvey(domainSurvey);
		expect(result).toEqual({
			description: '__DESCRIPTION__',
			id: '0deb07f3-28f5-47e1-b72a-d1b2a19d4670',
			inspectionStandardType: '__INSPECTIONSTANDARDTYPE__',
			status: '__STATUS__',
		});
		expect(result).toBeInstanceOf(Survey);
	});
});
