import { TensionWireSurvey } from './tension-wire-survey.model';

describe('Span Installation Survey / Model / TensionWire', () => {
	test('constructs a TensionWireSurvey instance', () => {
		const tensionWireSurvey = new TensionWireSurvey();
		tensionWireSurvey.id = '796229bf-1b54-4bb7-a7d4-acb0dc3062df';
		tensionWireSurvey.supportSystemId = '83ca470b-768a-49a7-a59f-4fe5da5620cf';
		tensionWireSurvey.tensionWireDamage = true;
		tensionWireSurvey.thirdPartyObjectsAttached = true;
		tensionWireSurvey.gaffTerminalDamage = true;
		tensionWireSurvey.gaffTerminalMissingParts = true;
		tensionWireSurvey.faultyMontage = true;
		tensionWireSurvey.tensionWireClampDamage = true;
		tensionWireSurvey.remarks = '__REMARKS__';
		expect(tensionWireSurvey).toBeInstanceOf(TensionWireSurvey);
		expect(tensionWireSurvey).toEqual({
			id: '796229bf-1b54-4bb7-a7d4-acb0dc3062df',
			supportSystemId: '83ca470b-768a-49a7-a59f-4fe5da5620cf',
			tensionWireDamage: true,
			thirdPartyObjectsAttached: true,
			gaffTerminalDamage: true,
			gaffTerminalMissingParts: true,
			faultyMontage: true,
			tensionWireClampDamage: true,
			remarks: '__REMARKS__',
		});
	});
});
