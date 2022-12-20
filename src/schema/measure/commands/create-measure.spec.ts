import { MockedObjectDeep } from 'ts-jest';

import { MeasureRepository } from '../measure.repository';
import { measureInput, domainMeasure } from '../__stubs__';
import { CreateMeasureCommand } from '../commands/create-measure.command';
import { CreateMeasureHandler } from '../commands/create-measure.handler';

const measureRepoMock: MockedObjectDeep<MeasureRepository> = {
	createMeasure: jest.fn().mockResolvedValue(domainMeasure),
	...(<any>{}),
};

describe('CreateMeasureHandler', () => {
	test('executes command', async () => {
		const command = new CreateMeasureCommand(measureInput);
		const result = await new CreateMeasureHandler(measureRepoMock).execute(command);

		expect(measureRepoMock.createMeasure).toHaveBeenCalledTimes(1);
		expect(measureRepoMock.createMeasure).toHaveBeenCalledWith(measureInput);

		expect(result).toEqual(domainMeasure);
	});
});
