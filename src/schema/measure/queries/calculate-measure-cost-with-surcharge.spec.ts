import { measure } from '../__stubs__';

import { CalculateMeasureCostWithSurchargeQuery } from './calculate-measure-cost-with-surcharge.query';
import { CalculateMeasureCostWithSurchargeHandler } from './calculate-measure-cost-with-surcharge.handler';

describe('CalculateMeasureCostWithSurchargeQuery', () => {
	test('executes query', async () => {
		const query = new CalculateMeasureCostWithSurchargeQuery(measure);
		expect(await new CalculateMeasureCostWithSurchargeHandler().execute(query)).toEqual(4962.54);
	});
});
