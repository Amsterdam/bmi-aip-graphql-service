import { MockedObjectDeep } from 'ts-jest';

import { unit } from '../__stubs__';
import { UnitService } from '../unit.service';

import { GetUnitsBySurveyIdQuery } from './get-units-by-survey-id.query';
import { GetUnitsBySurveyIdHandler } from './get-units-by-survey-id.handler';

const serviceMock: MockedObjectDeep<UnitService> = {
	getUnitsBySurveyId: jest.fn().mockResolvedValue(unit),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('GetUnitBySurveyIdQuery', () => {
	test('executes query', async () => {
		const query = new GetUnitsBySurveyIdQuery(identifier);
		const result = await new GetUnitsBySurveyIdHandler(serviceMock).execute(query);

		expect(serviceMock.getUnitsBySurveyId).toHaveBeenCalledTimes(1);
		expect(serviceMock.getUnitsBySurveyId).toHaveBeenCalledWith(identifier);

		expect(result).toEqual(unit);
	});
});
