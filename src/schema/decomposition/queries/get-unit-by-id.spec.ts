import { MockedObjectDeep } from 'ts-jest';

import { unit } from '../__stubs__';
import { UnitService } from '../unit.service';

import { GetUnitByIdQuery } from './get-unit-by-id.query';
import { GetUnitByIdHandler } from './get-unit-by-id.handler';

const serviceMock: MockedObjectDeep<UnitService> = {
	getUnitById: jest.fn().mockResolvedValue(unit),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('GetUnitBySurveyIdQuery', () => {
	test('executes query', async () => {
		const query = new GetUnitByIdQuery(identifier);
		const result = await new GetUnitByIdHandler(serviceMock).execute(query);

		expect(serviceMock.getUnitById).toHaveBeenCalledTimes(1);
		expect(serviceMock.getUnitById).toHaveBeenCalledWith(identifier);

		expect(result).toEqual(unit);
	});
});
