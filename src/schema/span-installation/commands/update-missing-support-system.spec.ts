import { MockedObjectDeep } from 'ts-jest';

import { SupportSystemRepository } from '../support-system.repository';
import {
	domainReviseSupportSystem,
	updateMissingSupportSystemInput,
	updateReviseSupportSystemNormalizedInput,
} from '../__stubs__';

import { UpdateMissingSupportSystemCommand } from './update-missing-support-system.command';
import { UpdateMissingSupportSystemHandler } from './update-missing-support-system.handler';

const supportSystemRepoMock: MockedObjectDeep<SupportSystemRepository> = {
	updateReviseSupportSystem: jest.fn().mockResolvedValue(domainReviseSupportSystem),
	...(<any>{}),
};

describe('UpdateMissingSupportSystemHandler', () => {
	test('executes command', async () => {
		const command = new UpdateMissingSupportSystemCommand(updateMissingSupportSystemInput);
		const result = await new UpdateMissingSupportSystemHandler(supportSystemRepoMock).execute(command);

		expect(supportSystemRepoMock.updateReviseSupportSystem).toHaveBeenCalledTimes(1);
		expect(supportSystemRepoMock.updateReviseSupportSystem).toHaveBeenCalledWith(
			updateReviseSupportSystemNormalizedInput,
		);

		expect(result).toEqual(domainReviseSupportSystem);
	});
});
