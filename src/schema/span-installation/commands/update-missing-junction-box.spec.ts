import { MockedObjectDeep } from 'ts-jest';

import { JunctionBoxRepository } from '../junction-box.repository';
import { domainReviseJunctionBox, updateMissingJunctionBoxInput } from '../__stubs__';

import { UpdateMissingJunctionBoxCommand } from './update-missing-junction-box.command';
import { UpdateMissingJunctionBoxHandler } from './update-missing-junction-box.handler';

const junctionBoxRepoMock: MockedObjectDeep<JunctionBoxRepository> = {
	reviseJunctionBox: jest.fn().mockResolvedValue(domainReviseJunctionBox),
	...(<any>{}),
};

describe('UpdateMissingJunctionBoxHandler', () => {
	test('executes command', async () => {
		const command = new UpdateMissingJunctionBoxCommand(updateMissingJunctionBoxInput);
		const result = await new UpdateMissingJunctionBoxHandler(junctionBoxRepoMock).execute(command);

		expect(junctionBoxRepoMock.reviseJunctionBox).toHaveBeenCalledTimes(1);
		expect(junctionBoxRepoMock.reviseJunctionBox).toHaveBeenCalledWith(updateMissingJunctionBoxInput);

		expect(result).toEqual(domainReviseJunctionBox);
	});
});
