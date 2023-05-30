import { MockedObjectDeep } from 'ts-jest';

import { SupportSystemRepository } from '../support-system.repository';
import {
	domainReviseSupportSystem,
	updateMissingSupportSystemInput,
	reviseSupportSystemNormalizedInput,
} from '../__stubs__';

import { UpdateMissingSupportSystemCommand } from './update-missing-support-system.command';
import { UpdateMissingSupportSystemHandler } from './update-missing-support-system.handler';

const supportSystemRepoMock: MockedObjectDeep<SupportSystemRepository> = {
	reviseSupportSystem: jest.fn().mockResolvedValue(domainReviseSupportSystem),
	...(<any>{}),
};

describe('UpdateMissingSupportSystemHandler', () => {
	test('executes command', async () => {
		const command = new UpdateMissingSupportSystemCommand(updateMissingSupportSystemInput);
		const result = await new UpdateMissingSupportSystemHandler(supportSystemRepoMock).execute(command);

		expect(supportSystemRepoMock.reviseSupportSystem).toHaveBeenCalledTimes(1);
		expect(supportSystemRepoMock.reviseSupportSystem).toHaveBeenCalledWith(reviseSupportSystemNormalizedInput);

		expect(result).toEqual(domainReviseSupportSystem);
	});
});
