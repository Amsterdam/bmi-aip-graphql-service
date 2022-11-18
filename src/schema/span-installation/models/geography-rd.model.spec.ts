import { GeographyRD } from './geography-rd.model';

describe('Span Installation / Model / A11yDetails', () => {
	test('constructs a A11yDetails instance', () => {
		const geographyRD = new GeographyRD();
		geographyRD.x = 116211.88;
		geographyRD.y = 487352.77;

		expect(geographyRD).toBeInstanceOf(GeographyRD);
		expect(geographyRD).toEqual({
			x: 116211.88,
			y: 487352.77,
		});
	});
});
