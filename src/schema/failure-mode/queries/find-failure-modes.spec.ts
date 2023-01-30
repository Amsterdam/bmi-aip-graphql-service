import { MockedObjectDeep } from 'ts-jest';

import { FailureModeService } from '../failure-mode.service';
import { domainFailureMode } from '../__stubs__';

import { FindFailureModesQuery } from './find-failure-modes.query';
import { FindFailureModesHandler } from './find-failure-modes.handler';

const failureModeMock: MockedObjectDeep<FailureModeService> = {
	findFailureModes: jest.fn().mockResolvedValue([domainFailureMode]),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('FindFailureModesHandler', () => {
	test('executes command', async () => {
		const command = new FindFailureModesQuery(identifier);
		const result = await new FindFailureModesHandler(failureModeMock).execute(command);

		expect(failureModeMock.findFailureModes).toHaveBeenCalledTimes(1);
		expect(failureModeMock.findFailureModes).toHaveBeenCalledWith(identifier);

		expect(result).toEqual([domainFailureMode]);
	});
});
