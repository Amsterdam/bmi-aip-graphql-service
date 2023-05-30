import { MockedObjectDeep } from 'ts-jest';

import { SupportSystemRepository } from '../support-system.repository';
import { domainReviseSupportSystem, reviseSupportSystemInput, reviseSupportSystemNormalizedInput } from '../__stubs__';

import { ReviseSupportSystemCommand } from './update-missing-support-system.command';
import { ReviseSupportSystemHandler } from './update-missing-support-system.handler';

const supportSystemRepoMock: MockedObjectDeep<SupportSystemRepository> = {
	reviseSupportSystem: jest.fn().mockResolvedValue(domainReviseSupportSystem),
	...(<any>{}),
};

describe('ReviseSupportSystemHandler', () => {
	test('executes command', async () => {
		const command = new ReviseSupportSystemCommand(reviseSupportSystemInput);
		const result = await new ReviseSupportSystemHandler(supportSystemRepoMock).execute(command);

		expect(supportSystemRepoMock.reviseSupportSystem).toHaveBeenCalledTimes(1);
		expect(supportSystemRepoMock.reviseSupportSystem).toHaveBeenCalledWith(reviseSupportSystemNormalizedInput);
		expect(result).toEqual(domainReviseSupportSystem);
	});
});
