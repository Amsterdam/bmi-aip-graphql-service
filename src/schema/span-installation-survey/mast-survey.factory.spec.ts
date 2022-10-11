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
});
