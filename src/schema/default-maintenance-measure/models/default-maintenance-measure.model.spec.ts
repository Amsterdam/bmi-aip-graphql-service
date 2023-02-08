import { DefaultMaintenanceMeasure } from './default-maintenance-measure.model';

describe('Model / JunctionBox', () => {
	test('constructs a DefaultMaintenanceMeasure instance', () => {
		const defaultMaintenanceMeasure = new DefaultMaintenanceMeasure();

		defaultMaintenanceMeasure.description = 'Grote revisie hydraulische aandrijving complex';
		defaultMaintenanceMeasure.createdAt = null;
		defaultMaintenanceMeasure.updatedAt = null;

		expect(defaultMaintenanceMeasure).toEqual({
			description: 'Grote revisie hydraulische aandrijving complex',
			createdAt: null,
			updatedAt: null,
		});
	});
});
