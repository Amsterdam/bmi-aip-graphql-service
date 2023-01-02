import { MockedObjectDeep } from 'ts-jest';

import { MeasureService } from '../measure.service';
import { domainMeasure } from '../__stubs__';

import { GetMeasuresQuery } from './get-measures.query';
import { GetMeasuresHandler } from './get-measures.handler';

const measureMock: MockedObjectDeep<MeasureService> = {
	getMeasures: jest.fn().mockResolvedValue([domainMeasure]),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('GetMeasuresHandler', () => {
	test('executes command', async () => {
		const command = new GetMeasuresQuery(identifier);
		const result = await new GetMeasuresHandler(measureMock).execute(command);

		expect(measureMock.getMeasures).toHaveBeenCalledTimes(1);
		expect(measureMock.getMeasures).toHaveBeenCalledWith(identifier);

		expect(result).toEqual([domainMeasure]);
	});
});
