import { measure } from '../__stubs__';

import { CalculateMeasureCostHandler } from './calculate-measure-cost.handler';
import { CalculateMeasureCostWithSurchargeQuery } from './calculate-measure-cost-with-surcharge.query';

describe('CalculateMeasureCostWithSurchargeQuery', () => {
	test('executes query', async () => {
		const query = new CalculateMeasureCostWithSurchargeQuery(measure);
		const result = await new CalculateMeasureCostHandler().execute(query);
		expect(result.costWithSurcharge).toEqual(4962.54);
	});
});
