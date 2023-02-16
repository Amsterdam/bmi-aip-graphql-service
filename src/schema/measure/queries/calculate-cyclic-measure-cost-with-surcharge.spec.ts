import { MockedObjectDeep } from 'ts-jest';

import { cyclicMeasure } from '../__stubs__';
import { UnitService } from '../../decomposition/unit.service';
import { unit } from '../../decomposition/__stubs__';

import { CalculateCyclicMeasureCostWithSurchargeQuery } from './calculate-cyclic-measure-cost-with-surcharge.query';
import { CalculateCyclicMeasureCostWithSurchargeHandler } from './calculate-cyclic-measure-cost-with-surcharge.handler';

const unitServiceMock: MockedObjectDeep<UnitService> = {
	getUnitById: jest.fn().mockResolvedValue(unit),
	...(<any>{}),
};

describe('CalculateCyclicMeasureCostWithSurchargeQuery', () => {
	test('executes query', async () => {
		const query = new CalculateCyclicMeasureCostWithSurchargeQuery(cyclicMeasure);
		expect(await new CalculateCyclicMeasureCostWithSurchargeHandler(unitServiceMock).execute(query)).toEqual(
			744.38,
		);
	});
});
