import { domainMastSurvey } from './__stubs__';
import { MastSurveyFactory } from './mast-survey.factory';
import { MastSurvey } from './models/mast-survey.model';

describe('Span Installation Survey / Mast / Factory', () => {
	test('CreateSupportSystem() constructs an instance of a MastSurvey GraphQL model', () => {
		const result = MastSurveyFactory.CreateMastSurvey(domainMastSurvey);
		const object = {
			...domainMastSurvey,
			createdAt: domainMastSurvey.created_at ?? null,
			updatedAt: domainMastSurvey.updated_at ?? null,
		};
		delete object.created_at;
		delete object.updated_at;
		expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(MastSurvey);
	});

	test('null values are permitted', () => {
		const nullValues = {
			mastDamage: null,
			mastMissingParts: null,
			tensionMastAngle: null,
			mastAttachmentDamage: null,
			mastBracketMissingParts: null,
			mastBracketDamage: null,
		};
		const result = MastSurveyFactory.CreateMastSurvey({
			...domainMastSurvey,
			...nullValues,
		});
		const object = {
			...domainMastSurvey,
			...nullValues,
			createdAt: domainMastSurvey.created_at ?? null,
			updatedAt: domainMastSurvey.updated_at ?? null,
		};
		delete object.created_at;
		delete object.updated_at;
		expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(MastSurvey);
	});
});
