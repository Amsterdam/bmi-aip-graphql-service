import { domainTensionWireSurvey } from './__stubs__';
import { TensionWireSurveyFactory } from './tension-wire-survey.factory';
import { TensionWireSurvey } from './models/tension-wire-survey.model';

describe('Span Installation Survey / Tension Wire / Factory', () => {
	test('CreateSupportSystem() constructs an instance of a TensionWireSurvey GraphQL model', () => {
		const result = TensionWireSurveyFactory.CreateTensionWireSurvey(domainTensionWireSurvey);
		const object = {
			...domainTensionWireSurvey,
			createdAt: domainTensionWireSurvey.created_at ?? null,
			updatedAt: domainTensionWireSurvey.updated_at ?? null,
		};
		delete object.created_at;
		delete object.updated_at;
		expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(TensionWireSurvey);
	});

	test('null values are permitted', () => {
		const nullValues = {
			tensionWireDamage: null,
			thirdPartyObjectsAttached: null,
			gaffTerminalDamage: null,
			gaffTerminalMissingParts: null,
			faultyMontage: null,
			tensionWireClampDamage: null,
		};
		const result = TensionWireSurveyFactory.CreateTensionWireSurvey({
			...domainTensionWireSurvey,
			...nullValues,
		});
		const object = {
			...domainTensionWireSurvey,
			...nullValues,
			createdAt: domainTensionWireSurvey.created_at ?? null,
			updatedAt: domainTensionWireSurvey.updated_at ?? null,
		};
		delete object.created_at;
		delete object.updated_at;
		expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(TensionWireSurvey);
	});
});
