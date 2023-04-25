import { MockedObjectDeep } from 'ts-jest';

// import { domainMeasure } from '../__stubs__';

// import { FindSpanMeasuresQuery } from './find-span-measures.query';
// import { FindSpanMeasuresHandler } from './find-span-measures.handler';

const measureMock: MockedObjectDeep<any> = {
	// getMeasures: jest.fn().mockResolvedValue([domainMeasure]),
	// ...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('FindMeasuresHandler', () => {
	test('executes command', async () => {
		// const command = new FindSpanMeasuresQuery();
		// const result = await new FindSpanMeasuresHandler().execute(command);

		expect(measureMock.getMeasures).toHaveBeenCalledTimes(1);
		expect(measureMock.getMeasures).toHaveBeenCalledWith(identifier);

		// expect(result).toEqual([domainMeasure]);
	});
});
