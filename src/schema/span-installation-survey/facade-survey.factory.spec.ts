import { domainFacadeSurvey } from './__stubs__';
import { FacadeSurveyFactory } from './facade-survey.factory';
import { FacadeSurvey } from './models/facade-survey.model';

describe('Span Installation Survey / Facade / Factory', () => {
	test('CreateSupportSystem() constructs an instance of a FacadeSurvey GraphQL model', () => {
		const result = FacadeSurveyFactory.CreateFacadeSurvey(domainFacadeSurvey);
		const object = {
			...domainFacadeSurvey,
			createdAt: domainFacadeSurvey.created_at ?? null,
			updatedAt: domainFacadeSurvey.updated_at ?? null,
		};
		delete object.created_at;
		delete object.updated_at;
		expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(FacadeSurvey);
	});
});
