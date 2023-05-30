import { MockedObjectDeep } from 'ts-jest';

import { SupportSystemRepository } from '../support-system.repository';
import {
	createMissingSupportSystemInput,
	createReviseSupportSystemNormalizedInput,
	domainReviseSupportSystem,
} from '../__stubs__';

import { CreateMissingSupportSystemCommand } from './create-missing-support-system.command';
import { CreateMissingSupportSystemHandler } from './create-missing-support-system.handler';

const supportSystemRepoMock: MockedObjectDeep<SupportSystemRepository> = {
	createReviseSupportSystem: jest.fn().mockResolvedValue(domainReviseSupportSystem),
	...(<any>{}),
};

describe('CreateMissingSupportSystemHandler', () => {
	test('executes command', async () => {
		const command = new CreateMissingSupportSystemCommand(createMissingSupportSystemInput);
		const result = await new CreateMissingSupportSystemHandler(supportSystemRepoMock).execute(command);

		expect(supportSystemRepoMock.createReviseSupportSystem).toHaveBeenCalledTimes(1);
		expect(supportSystemRepoMock.createReviseSupportSystem).toHaveBeenCalledWith(
			createReviseSupportSystemNormalizedInput,
		);

		expect(result).toEqual(domainReviseSupportSystem);
	});
});
