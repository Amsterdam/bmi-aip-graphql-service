import { MockedObjectDeep } from 'ts-jest';

import { MeasureRepository } from '../measure.repository';
import { domainMeasure } from '../__stubs__';

import { DeleteMeasureCommand } from './delete-measure.command';
import { DeleteMeasureHandler } from './delete-measure.handler';

const measureRepoMock: MockedObjectDeep<MeasureRepository> = {
	deleteMeasure: jest.fn().mockResolvedValue(domainMeasure),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('DeleteMeasureHandler', () => {
	test('executes command', async () => {
		const command = new DeleteMeasureCommand(identifier);
		const result = await new DeleteMeasureHandler(measureRepoMock).execute(command);

		expect(measureRepoMock.deleteMeasure).toHaveBeenCalledTimes(1);
		expect(measureRepoMock.deleteMeasure).toHaveBeenCalledWith(identifier);

		expect(result).toEqual(domainMeasure);
	});
});
