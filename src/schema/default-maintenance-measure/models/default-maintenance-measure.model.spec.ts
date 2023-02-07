import { DefaultMaintenanceMeasure } from './default-maintenance-measure.model';

describe('TI / Model / JunctionBox', () => {
	test('constructs a DefaultMaintenanceMeasure instance', () => {
		const defaultMaintenanceMeasure = new DefaultMaintenanceMeasure();

		defaultMaintenanceMeasure.description =
			'Gebreken aan het oppervlak van de materialen waarvan het bouw- of installatiedeel is gemaakt.';
		defaultMaintenanceMeasure.createdAt = null;
		defaultMaintenanceMeasure.updatedAt = null;

		expect(defaultMaintenanceMeasure).toEqual({
			description:
				'Gebreken aan het oppervlak van de materialen waarvan het bouw- of installatiedeel is gemaakt.',
			createdAt: null,
			updatedAt: null,
		});
	});
});
