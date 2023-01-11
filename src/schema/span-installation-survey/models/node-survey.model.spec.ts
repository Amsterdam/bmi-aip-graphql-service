import { NodeSurvey } from './node-survey.model';

describe('Span Installation Survey / Model / Node', () => {
	test('constructs a NodeSurvey instance', () => {
		const nodeSurvey = new NodeSurvey();
		nodeSurvey.id = '796229bf-1b54-4bb7-a7d4-acb0dc3062df';
		nodeSurvey.supportSystemId = '83ca470b-768a-49a7-a59f-4fe5da5620cf';
		nodeSurvey.nodeDamage = true;
		nodeSurvey.remarks = '__REMARKS__';
		expect(nodeSurvey).toBeInstanceOf(NodeSurvey);
		expect(nodeSurvey).toEqual({
			id: '796229bf-1b54-4bb7-a7d4-acb0dc3062df',
			nodeDamage: true,
			remarks: '__REMARKS__',
			supportSystemId: '83ca470b-768a-49a7-a59f-4fe5da5620cf',
		});
	});
});
