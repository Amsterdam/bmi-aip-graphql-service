import { MockedObjectDeep } from 'ts-jest';

import { SupportSystemRepository } from '../support-system.repository';
import { createSupportSystemInput, createSupportSystemNormalizedInput, domainSupportSystem } from '../__stubs__';

import { CreateSupportSystemCommand } from './create-support-system.command';
import { CreateSupportSystemHandler } from './create-support-system.handler';

const supportSystemRepoMock: MockedObjectDeep<SupportSystemRepository> = {
	createSupportSystem: jest.fn().mockResolvedValue(domainSupportSystem),
	...(<any>{}),
};

describe('CreateSupportSystemHandler', () => {
	test('executes command', async () => {
		const command = new CreateSupportSystemCommand(createSupportSystemInput);
		const result = await new CreateSupportSystemHandler(supportSystemRepoMock).execute(command);

		expect(supportSystemRepoMock.createSupportSystem).toHaveBeenCalledTimes(1);
		expect(supportSystemRepoMock.createSupportSystem).toHaveBeenCalledWith(createSupportSystemNormalizedInput);

		expect(result).toEqual(domainSupportSystem);
	});
});
