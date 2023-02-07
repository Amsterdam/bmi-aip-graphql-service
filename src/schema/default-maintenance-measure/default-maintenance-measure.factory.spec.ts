import { DefaultMaintenanceMeasureFactory } from './default-maintenance-measure.factory';
import { domainDefaultMaintenanceMeasure } from './__stubs__';
import { DefaultMaintenanceMeasure } from './models/default-maintenance-measure.model';

describe('DefaultMaintenanceMeasure / Factory', () => {
	test('CreateDefaultMaintenanceMeasure() constructs an instance of a DefaultMaintenanceMeasure GraphQL model', () => {
		const result = DefaultMaintenanceMeasureFactory.CreateDefaultMaintenanceMeasure(
			domainDefaultMaintenanceMeasure,
		);
		const object = {
			...domainDefaultMaintenanceMeasure,
			createdAt: domainDefaultMaintenanceMeasure.created_at ?? null,
			updatedAt: domainDefaultMaintenanceMeasure.updated_at ?? null,
		};
		delete object.created_at;
		delete object.updated_at;
		expect(result).toEqual(expect.objectContaining(object));
		expect(result).toBeInstanceOf(DefaultMaintenanceMeasure);
	});
});
