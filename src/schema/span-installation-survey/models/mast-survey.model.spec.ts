import { MastSurvey } from './mast-survey.model';

describe('Span Installation Survey / Model / Mast', () => {
	test('constructs a MastSurvey instance', () => {
		const mastSurvey = new MastSurvey();
		mastSurvey.id = '796229bf-1b54-4bb7-a7d4-acb0dc3062df';
		mastSurvey.surveyId = '9003d096-4dd2-4d0d-b74b-9406a721d94d';
		mastSurvey.supportSystemId = '83ca470b-768a-49a7-a59f-4fe5da5620cf';
		mastSurvey.mastDamage = true;
		mastSurvey.mastMissingParts = true;
		mastSurvey.tensionMastAngle = true;
		mastSurvey.mastAttachmentDamage = true;
		mastSurvey.mastBracketMissingParts = true;
		mastSurvey.mastBracketDamage = true;
		mastSurvey.remarks = '__REMARKS__';
		expect(mastSurvey).toBeInstanceOf(MastSurvey);
		expect(mastSurvey).toEqual({
			id: '796229bf-1b54-4bb7-a7d4-acb0dc3062df',
			mastAttachmentDamage: true,
			mastBracketDamage: true,
			mastBracketMissingParts: true,
			mastDamage: true,
			mastMissingParts: true,
			remarks: '__REMARKS__',
			supportSystemId: '83ca470b-768a-49a7-a59f-4fe5da5620cf',
			surveyId: '9003d096-4dd2-4d0d-b74b-9406a721d94d',
			tensionMastAngle: true,
		});
	});
});
