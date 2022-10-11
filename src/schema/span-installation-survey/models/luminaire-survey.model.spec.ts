import { LuminaireSurvey } from './luminaire-survey.model';

describe('Span Installation Survey / Model / Luminaire', () => {
	test('constructs a LuminaireSurvey instance', () => {
		const mastSurvey = new LuminaireSurvey();
		mastSurvey.id = '796229bf-1b54-4bb7-a7d4-acb0dc3062df';
		mastSurvey.luminaireId = '83ca470b-768a-49a7-a59f-4fe5da5620cf';
		mastSurvey.luminaireDamage = true;
		mastSurvey.remarks = '__REMARKS__';
		expect(mastSurvey).toBeInstanceOf(LuminaireSurvey);
		expect(mastSurvey).toEqual({
			id: '796229bf-1b54-4bb7-a7d4-acb0dc3062df',
			luminaireDamage: true,
			luminaireId: '83ca470b-768a-49a7-a59f-4fe5da5620cf',
			remarks: '__REMARKS__',
		});
	});
});
