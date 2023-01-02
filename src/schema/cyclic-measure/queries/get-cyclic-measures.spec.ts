import { MockedObjectDeep } from 'ts-jest';

import { CyclicMeasureService } from '../cyclic-measure.service';
import { domainCyclicMeasure } from '../__stubs__';

import { GetCyclicMeasuresQuery } from './get-cyclic-measures.query';
import { GetCyclicMeasuresHandler } from './get-cyclic-measures.handler';

const cyclicMeasureMock: MockedObjectDeep<CyclicMeasureService> = {
	getCyclicMeasures: jest.fn().mockResolvedValue([domainCyclicMeasure]),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('GetMeasuresHandler', () => {
	test('executes command', async () => {
		const command = new GetCyclicMeasuresQuery(identifier);
		const result = await new GetCyclicMeasuresHandler(cyclicMeasureMock).execute(command);

		expect(cyclicMeasureMock.getCyclicMeasures).toHaveBeenCalledTimes(1);
		expect(cyclicMeasureMock.getCyclicMeasures).toHaveBeenCalledWith(identifier);

		expect(result).toEqual([domainCyclicMeasure]);
	});
});
