import { FacadeSurvey } from './facade-survey.model';

describe('Span Installation Survey / Model / Facade', () => {
	test('constructs a FacadeSurvey instance', () => {
		const facadeSurvey = new FacadeSurvey();
		facadeSurvey.id = '796229bf-1b54-4bb7-a7d4-acb0dc3062df';
		facadeSurvey.supportSystemId = '83ca470b-768a-49a7-a59f-4fe5da5620cf';
		facadeSurvey.facadeDamageWithin1m = true;
		facadeSurvey.hinderingVegetation = true;
		facadeSurvey.wallPlateDamage = true;
		facadeSurvey.faultyMontage = true;
		facadeSurvey.nutNotFullyOverThreadedRod = true;
		facadeSurvey.missingFasteners = true;
		facadeSurvey.measuredPreload = 10;
		facadeSurvey.appliedAdditionalTraction = 2;
		facadeSurvey.facadeConnectionFailed = true;
		facadeSurvey.facadeConnectionFailureAdditionalTraction = 3;
		facadeSurvey.remarks = '__REMARKS__';
		expect(facadeSurvey).toBeInstanceOf(FacadeSurvey);
		expect(facadeSurvey).toEqual({
			appliedAdditionalTraction: 2,
			facadeConnectionFailed: true,
			facadeConnectionFailureAdditionalTraction: 3,
			facadeDamageWithin1m: true,
			faultyMontage: true,
			hinderingVegetation: true,
			id: '796229bf-1b54-4bb7-a7d4-acb0dc3062df',
			measuredPreload: 10,
			missingFasteners: true,
			nutNotFullyOverThreadedRod: true,
			remarks: '__REMARKS__',
			supportSystemId: '83ca470b-768a-49a7-a59f-4fe5da5620cf',
			wallPlateDamage: true,
		});
	});
});
