import { MockedObjectDeep } from 'ts-jest';

import { SupportSystemRepository } from '../support-system.repository';
import {
	createMissingSupportSystemInput,
	createMissingSupportSystemNormalizedInput,
	domainReviseSupportSystem,
} from '../__stubs__';

import { CreateMissingSupportSystemCommand } from './create-missing-support-system.command';
import { CreateMissingSupportSystemHandler } from './create-missing-support-system.handler';

const supportSystemRepoMock: MockedObjectDeep<SupportSystemRepository> = {
	createMissingSupportSystem: jest.fn().mockResolvedValue(domainReviseSupportSystem),
	...(<any>{}),
};

describe('CreateMissingSupportSystemHandler', () => {
	test('executes command', async () => {
		const command = new CreateMissingSupportSystemCommand(createMissingSupportSystemInput);
		const result = await new CreateMissingSupportSystemHandler(supportSystemRepoMock).execute(command);

		expect(supportSystemRepoMock.createMissingSupportSystem).toHaveBeenCalledTimes(1);
		expect(supportSystemRepoMock.createMissingSupportSystem).toHaveBeenCalledWith(
			createMissingSupportSystemNormalizedInput,
		);

		expect(result).toEqual(domainReviseSupportSystem);
	});
});
