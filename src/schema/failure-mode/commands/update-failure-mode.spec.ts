import { MockedObjectDeep } from 'ts-jest';

import { FailureModeRepository } from '../failure-mode.repository';
import { domainFailureMode, updateFailureModeInput } from '../__stubs__';
import { UpdateFailureModeCommand } from '../commands/update-failure-mode.command';
import { UpdateFailureModeHandler } from '../commands/update-failure-mode.handler';

const failureModeRepoMock: MockedObjectDeep<FailureModeRepository> = {
	updateFailureMode: jest.fn().mockResolvedValue(domainFailureMode),
	...(<any>{}),
};

describe('UpdateFailureModeHandler', () => {
	test('executes command', async () => {
		const command = new UpdateFailureModeCommand(updateFailureModeInput);
		const result = await new UpdateFailureModeHandler(failureModeRepoMock).execute(command);

		expect(failureModeRepoMock.updateFailureMode).toHaveBeenCalledTimes(1);
		expect(failureModeRepoMock.updateFailureMode).toHaveBeenCalledWith(updateFailureModeInput);

		expect(result).toEqual(domainFailureMode);
	});
});
