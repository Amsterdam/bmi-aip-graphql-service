import { measure } from '../__stubs__';

import { CalculateMeasureCostQuery } from './calculate-measure-cost.query';
import { CalculateMeasureCostHandler } from './calculate-measure-cost.handler';

describe('CalculateMeasureCostQuery', () => {
	test('executes query', async () => {
		const query = new CalculateMeasureCostQuery(measure);
		expect(await new CalculateMeasureCostHandler().execute(query)).toEqual(679.8);
	});
});
