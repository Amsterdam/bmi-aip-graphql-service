import { MockedObjectDeep } from 'ts-jest';

import { MeasureRepository } from '../measure.repository';
import { domainMeasure, updateMeasureInput } from '../__stubs__';
import { UpdateMeasureCommand } from '../commands/update-measure.command';
import { UpdateMeasureHandler } from '../commands/update-measure.handler';

const measureRepoMock: MockedObjectDeep<MeasureRepository> = {
	updateMeasure: jest.fn().mockResolvedValue(domainMeasure),
	...(<any>{}),
};

describe('UpdateMeasureHandler', () => {
	test('executes command', async () => {
		const command = new UpdateMeasureCommand(updateMeasureInput);
		const result = await new UpdateMeasureHandler(measureRepoMock).execute(command);

		expect(measureRepoMock.updateMeasure).toHaveBeenCalledTimes(1);
		expect(measureRepoMock.updateMeasure).toHaveBeenCalledWith(updateMeasureInput);

		expect(result).toEqual(domainMeasure);
	});
});
