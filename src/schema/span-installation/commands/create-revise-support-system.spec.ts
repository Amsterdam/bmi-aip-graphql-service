import { MockedObjectDeep } from 'ts-jest';

import { SupportSystemRepository } from '../support-system.repository';
import {
	createMissingSupportSystemInput,
	createReviseSupportSystemNormalizedInput,
	domainReviseSupportSystem,
} from '../__stubs__';

import { CreateReviseSupportSystemCommand } from './create-revise-support-system.command';
import { CreateReviseSupportSystemHandler } from './create-revise-support-system.handler';

const supportSystemRepoMock: MockedObjectDeep<SupportSystemRepository> = {
	createReviseSupportSystem: jest.fn().mockResolvedValue(domainReviseSupportSystem),
	...(<any>{}),
};

describe('CreateReviseSupportSystemHandler', () => {
	test('executes command', async () => {
		const command = new CreateReviseSupportSystemCommand(createMissingSupportSystemInput);
		const result = await new CreateReviseSupportSystemHandler(supportSystemRepoMock).execute(command);

		expect(supportSystemRepoMock.createReviseSupportSystem).toHaveBeenCalledTimes(1);
		expect(supportSystemRepoMock.createReviseSupportSystem).toHaveBeenCalledWith(
			createReviseSupportSystemNormalizedInput,
		);

		expect(result).toEqual(domainReviseSupportSystem);
	});
});
