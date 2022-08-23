import { MockedObjectDeep } from 'ts-jest';

import { SupportSystemService } from '../support-system.service';
import { domainSupportSystem } from '../__stubs__';

import { FindSupportSystemsQuery } from './find-support-systems.query';
import { FindSupportSystemsHandler } from './find-support-systems.handler';

const supportSystemMock: MockedObjectDeep<SupportSystemService> = {
	getSupportSystems: jest.fn().mockResolvedValue([domainSupportSystem]),
	...(<any>{}),
};

const identifier = 'b6bbf83e-da23-4693-9502-e6000015c709';

describe('FindSupportSystemsHandler', () => {
	test('executes command', async () => {
		const command = new FindSupportSystemsQuery(identifier);
		const result = await new FindSupportSystemsHandler(supportSystemMock).execute(command);

		expect(supportSystemMock.getSupportSystems).toHaveBeenCalledTimes(1);
		expect(supportSystemMock.getSupportSystems).toHaveBeenCalledWith(identifier);

		expect(result).toEqual([domainSupportSystem]);
	});
});
