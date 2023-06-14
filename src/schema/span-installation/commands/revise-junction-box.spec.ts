import { MockedObjectDeep } from 'ts-jest';

import { JunctionBoxRepository } from '../junction-box.repository';
import { domainReviseJunctionBox, reviseJunctionBoxInput } from '../__stubs__';

import { ReviseJunctionBoxCommand } from './revise-junction-box.command';
import { ReviseJunctionBoxHandler } from './revise-junction-box.handler';

const junctionBoxRepoMock: MockedObjectDeep<JunctionBoxRepository> = {
	reviseJunctionBox: jest.fn().mockResolvedValue(domainReviseJunctionBox),
	...(<any>{}),
};

describe('ReviseJunctionBoxHandler', () => {
	test('executes command', async () => {
		const command = new ReviseJunctionBoxCommand(reviseJunctionBoxInput);
		const result = await new ReviseJunctionBoxHandler(junctionBoxRepoMock).execute(command);

		expect(junctionBoxRepoMock.reviseJunctionBox).toHaveBeenCalledTimes(1);
		expect(junctionBoxRepoMock.reviseJunctionBox).toHaveBeenCalledWith(reviseJunctionBoxInput);

		expect(result).toEqual(domainReviseJunctionBox);
	});
});
