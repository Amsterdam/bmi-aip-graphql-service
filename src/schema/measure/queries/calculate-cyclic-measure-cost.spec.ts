import { MockedObjectDeep } from 'ts-jest';

import { cyclicMeasure } from '../__stubs__';
import { unit } from '../../decomposition/__stubs__';
import { UnitService } from '../../decomposition/unit.service';

import { CalculateCyclicMeasureCostQuery } from './calculate-cyclic-measure-cost.query';
import { CalculateCyclicMeasureCostHandler } from './calculate-cyclic-measure-cost.handler';

const unitServiceMock: MockedObjectDeep<UnitService> = {
	getUnitById: jest.fn().mockResolvedValue(unit),
	...(<any>{}),
};

describe('CalculateCyclicMeasureCostQuery', () => {
	test('executes query', async () => {
		const query = new CalculateCyclicMeasureCostQuery(cyclicMeasure);
		expect(await new CalculateCyclicMeasureCostHandler(unitServiceMock).execute(query)).toEqual(101.97);
	});
});
