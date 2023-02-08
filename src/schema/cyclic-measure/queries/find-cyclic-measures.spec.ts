import { MockedObjectDeep } from 'ts-jest';

import { CyclicMeasureService } from '../cyclic-measure.service';
import { domainCyclicMeasure } from '../__stubs__';
import { FindCyclicMeasuresQuery } from '../queries/find-cyclic-measures.query';
import { FindCyclicMeasuresHandler } from '../queries/find-cyclic-measures.handler';

const cyclicMeasureMock: MockedObjectDeep<CyclicMeasureService> = {
	findCyclicMeasures: jest.fn().mockResolvedValue([domainCyclicMeasure]),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('FindMeasuresHandler', () => {
	test('executes command', async () => {
		const command = new FindCyclicMeasuresQuery(identifier);
		const result = await new FindCyclicMeasuresHandler(cyclicMeasureMock).execute(command);

		expect(cyclicMeasureMock.findCyclicMeasures).toHaveBeenCalledTimes(1);
		expect(cyclicMeasureMock.findCyclicMeasures).toHaveBeenCalledWith(identifier);

		expect(result).toEqual([domainCyclicMeasure]);
	});
});
