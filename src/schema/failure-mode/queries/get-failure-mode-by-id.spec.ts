import { MockedObjectDeep } from 'ts-jest';

import { failureMode } from '../__stubs__';
import { FailureModeService } from '../failure-mode.service';

import { GetFailureModeByIdQuery } from './get-failure-mode-by-id.query';
import { GetFailureModeByIdHandler } from './get-failure-mode-by-id.handler';

const failureModeServiceMock: MockedObjectDeep<FailureModeService> = {
	getFailureMode: jest.fn().mockResolvedValue(failureMode),
	...(<any>{}),
};

const failureModeId = '3cc978ca-3b4e-476a-b44c-d4cf6f6ac8f7';

describe('GetFailureModeHandler', () => {
	test('executes query', async () => {
		const command = new GetFailureModeByIdQuery(failureModeId);
		const result = await new GetFailureModeByIdHandler(failureModeServiceMock).execute(command);

		expect(failureModeServiceMock.getFailureMode).toHaveBeenCalledTimes(1);
		expect(failureModeServiceMock.getFailureMode).toHaveBeenCalledWith(failureModeId);

		expect(result).toEqual(failureMode);
	});
});
