import { MockedObjectDeep } from 'ts-jest';

import { FailureModeRepository } from '../failure-mode.repository';
import { failureModeInput, domainFailureMode } from '../__stubs__';
import { CreateFailureModeCommand } from '../commands/create-failure-mode.command';
import { CreateFailureModeHandler } from '../commands/create-failure-mode.handler';

const failureModeRepoMock: MockedObjectDeep<FailureModeRepository> = {
	createFailureMode: jest.fn().mockResolvedValue(domainFailureMode),
	...(<any>{}),
};

describe('CreateFailureModeHandler', () => {
	test('executes command', async () => {
		const command = new CreateFailureModeCommand(failureModeInput);
		const result = await new CreateFailureModeHandler(failureModeRepoMock).execute(command);

		expect(failureModeRepoMock.createFailureMode).toHaveBeenCalledTimes(1);
		expect(failureModeRepoMock.createFailureMode).toHaveBeenCalledWith(failureModeInput);

		expect(result).toEqual(domainFailureMode);
	});
});
