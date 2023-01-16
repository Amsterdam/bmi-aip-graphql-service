import { MockedObjectDeep } from 'ts-jest';

import { MeasureService } from '../measure.service';
import { domainMeasure } from '../__stubs__';

import { FindMeasuresQuery } from './find-measures.query';
import { FindMeasuresHandler } from './find-measures.handler';

const measureMock: MockedObjectDeep<MeasureService> = {
	findMeasures: jest.fn().mockResolvedValue([domainMeasure]),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('FindMeasuresHandler', () => {
	test('executes command', async () => {
		const command = new FindMeasuresQuery(identifier);
		const result = await new FindMeasuresHandler(measureMock).execute(command);

		expect(measureMock.findMeasures).toHaveBeenCalledTimes(1);
		expect(measureMock.findMeasures).toHaveBeenCalledWith(identifier);

		expect(result).toEqual([domainMeasure]);
	});
});
