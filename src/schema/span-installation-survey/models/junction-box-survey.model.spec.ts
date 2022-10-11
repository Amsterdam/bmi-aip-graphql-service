import { JunctionBoxSurvey } from './junction-box-survey.model';

describe('Span Installation Survey / Model / JunctionBox', () => {
	test('constructs a JunctionBoxSurvey instance', () => {
		const mastSurvey = new JunctionBoxSurvey();
		mastSurvey.id = '796229bf-1b54-4bb7-a7d4-acb0dc3062df';
		mastSurvey.surveyId = '9003d096-4dd2-4d0d-b74b-9406a721d94d';
		mastSurvey.junctionBoxId = '83ca470b-768a-49a7-a59f-4fe5da5620cf';
		mastSurvey.cableDamage = true;
		mastSurvey.faultyMontageTensionWire = true;
		mastSurvey.faultyMontageFacade = true;
		mastSurvey.junctionBoxDamage = true;
		mastSurvey.stickerNotReadable = true;
		mastSurvey.remarks = '__REMARKS__';
		expect(mastSurvey).toBeInstanceOf(JunctionBoxSurvey);
		expect(mastSurvey).toEqual({
			cableDamage: true,
			faultyMontageFacade: true,
			faultyMontageTensionWire: true,
			id: '796229bf-1b54-4bb7-a7d4-acb0dc3062df',
			junctionBoxDamage: true,
			remarks: '__REMARKS__',
			stickerNotReadable: true,
			junctionBoxId: '83ca470b-768a-49a7-a59f-4fe5da5620cf',
			surveyId: '9003d096-4dd2-4d0d-b74b-9406a721d94d',
		});
	});
});
