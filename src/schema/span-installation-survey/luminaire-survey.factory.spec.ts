import { domainLuminaireSurvey } from './__stubs__';
import { LuminaireSurveyFactory } from './luminaire-survey.factory';
import { LuminaireSurvey } from './models/luminaire-survey.model';

describe('Span Installation Survey / Luminaire / Factory', () => {
	test('CreateSupportSystem() constructs an instance of a LuminaireSurvey GraphQL model', () => {
		const result = LuminaireSurveyFactory.CreateLuminaireSurvey(domainLuminaireSurvey);
		const object = {
			...domainLuminaireSurvey,
			createdAt: domainLuminaireSurvey.created_at ?? null,
			updatedAt: domainLuminaireSurvey.updated_at ?? null,
		};
		delete object.created_at;
		delete object.updated_at;
		expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(LuminaireSurvey);
	});
});
