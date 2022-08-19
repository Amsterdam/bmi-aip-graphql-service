import { MockedObjectDeep } from 'ts-jest';

import { SupportSystemRepository } from '../support-system.repository';
import { domainSupportSystem } from '../__stubs__';

import { DeleteSupportSystemCommand } from './delete-support-system.command';
import { DeleteSupportSystemHandler } from './delete-support-system.handler';

const supportSystemRepoMock: MockedObjectDeep<SupportSystemRepository> = {
	deleteSupportSystem: jest.fn().mockResolvedValue(domainSupportSystem),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('DeleteSupportSystemHandler', () => {
	test('executes command', async () => {
		const command = new DeleteSupportSystemCommand(identifier);
		const result = await new DeleteSupportSystemHandler(supportSystemRepoMock).execute(command);

		expect(supportSystemRepoMock.deleteSupportSystem).toHaveBeenCalledTimes(1);
		expect(supportSystemRepoMock.deleteSupportSystem).toHaveBeenCalledWith(identifier);

		expect(result).toEqual(domainSupportSystem);
	});
});
