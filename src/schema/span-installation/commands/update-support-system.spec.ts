import { MockedObjectDeep } from 'ts-jest';

import { SupportSystemRepository } from '../support-system.repository';
import { domainSupportSystem, updateSupportSystemInput, updateSupportSystemNormalizedInput } from '../__stubs__';

import { UpdateSupportSystemCommand } from './update-support-system.command';
import { UpdateSupportSystemHandler } from './update-support-system.handler';

const supportSystemRepoMock: MockedObjectDeep<SupportSystemRepository> = {
	updateSupportSystem: jest.fn().mockResolvedValue(domainSupportSystem),
	...(<any>{}),
};

describe('UpdateSupportSystemHandler', () => {
	test('executes command', async () => {
		const command = new UpdateSupportSystemCommand(updateSupportSystemInput);
		const result = await new UpdateSupportSystemHandler(supportSystemRepoMock).execute(command);

		expect(supportSystemRepoMock.updateSupportSystem).toHaveBeenCalledTimes(1);
		expect(supportSystemRepoMock.updateSupportSystem).toHaveBeenCalledWith(updateSupportSystemNormalizedInput);

		expect(result).toEqual(domainSupportSystem);
	});
});
