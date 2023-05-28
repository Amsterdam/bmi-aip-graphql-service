import { MockedObjectDeep } from 'ts-jest';

import { SupportSystemRepository } from '../support-system.repository';
import {
	domainReviseSupportSystem,
	updateReviseSupportSystemInput,
	updateReviseSupportSystemNormalizedInput,
} from '../__stubs__';

import { UpdateReviseSupportSystemCommand } from './update-revise-support-system.command';
import { UpdateReviseSupportSystemHandler } from './update-revise-support-system.handler';

const supportSystemRepoMock: MockedObjectDeep<SupportSystemRepository> = {
	updateReviseSupportSystem: jest.fn().mockResolvedValue(domainReviseSupportSystem),
	...(<any>{}),
};

describe('UpdateReviseSupportSystemHandler', () => {
	test('executes command', async () => {
		const command = new UpdateReviseSupportSystemCommand(updateReviseSupportSystemInput);
		const result = await new UpdateReviseSupportSystemHandler(supportSystemRepoMock).execute(command);

		expect(supportSystemRepoMock.updateReviseSupportSystem).toHaveBeenCalledTimes(1);
		expect(supportSystemRepoMock.updateReviseSupportSystem).toHaveBeenCalledWith(
			updateReviseSupportSystemNormalizedInput,
		);

		expect(result).toEqual(domainReviseSupportSystem);
	});
});
