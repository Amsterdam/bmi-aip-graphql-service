import { domainJunctionBoxSurvey } from './__stubs__';
import { JunctionBoxSurveyFactory } from './junction-box-survey.factory';
import { JunctionBoxSurvey } from './models/junction-box-survey.model';

describe('Span Installation Survey / JunctionBox / Factory', () => {
	test('CreateSupportSystem() constructs an instance of a JunctionBoxSurvey GraphQL model', () => {
		const result = JunctionBoxSurveyFactory.CreateJunctionBoxSurvey(domainJunctionBoxSurvey);
		const object = {
			...domainJunctionBoxSurvey,
			createdAt: domainJunctionBoxSurvey.created_at ?? null,
			updatedAt: domainJunctionBoxSurvey.updated_at ?? null,
		};
		delete object.created_at;
		delete object.updated_at;
		expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(JunctionBoxSurvey);
	});
});
