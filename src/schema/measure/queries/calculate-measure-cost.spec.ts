import { measure } from '../__stubs__';

import { CalculateMeasureCostQuery } from './calculate-measure-cost.query';
import { CalculateMeasureCostHandler } from './calculate-measure-cost.handler';

describe('CalculateMeasureCostQuery', () => {
	test('executes query', async () => {
		const query = new CalculateMeasureCostQuery(measure);
		const result = await new CalculateMeasureCostHandler().execute(query);
		expect(result.cost).toEqual(679.8);
	});
});
