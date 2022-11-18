import { GeographyRDFactory } from './geography-rd.factory';

describe('Span Installation / GeographyRD / Factory', () => {
	test('CreateJunctionBox() constructs an instance of a JunctionBox GraphQL model', () => {
		const result = GeographyRDFactory.CreateGeographyRDFromJSONB({
			x: 116211.88,
			y: 487352.77,
		});
		expect(result).toEqual({
			x: 116211.88,
			y: 487352.77,
		});
	});
});
