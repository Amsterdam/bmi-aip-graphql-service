import { domainNodeSurvey } from './__stubs__';
import { NodeSurveyFactory } from './node-survey.factory';
import { NodeSurvey } from './models/node-survey.model';

describe('Span Installation Survey / Node / Factory', () => {
	test('CreateSupportSystem() constructs an instance of a NodeSurvey GraphQL model', () => {
		const result = NodeSurveyFactory.CreateNodeSurvey(domainNodeSurvey);
		const object = {
			...domainNodeSurvey,
			createdAt: domainNodeSurvey.created_at ?? null,
			updatedAt: domainNodeSurvey.updated_at ?? null,
		};
		delete object.created_at;
		delete object.updated_at;
		expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(NodeSurvey);
	});

	test('null values are permitted', () => {
		const nullValues = {
			nodeDamage: null,
		};
		const result = NodeSurveyFactory.CreateNodeSurvey({
			...domainNodeSurvey,
			...nullValues,
		});
		const object = {
			...domainNodeSurvey,
			...nullValues,
			createdAt: domainNodeSurvey.created_at ?? null,
			updatedAt: domainNodeSurvey.updated_at ?? null,
		};
		delete object.created_at;
		delete object.updated_at;
		expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(NodeSurvey);
	});
});
